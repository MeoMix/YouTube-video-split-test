define(function(require) {
    'use strict';

    var PlayerState = require('common/enum/playerState');
    var YouTubePlayerState = require('common/enum/youTubePlayerState');

    var Player = Backbone.Model.extend({
        defaults: function() {
            return {
                //  Returns the elapsed time of the currently loaded song. Returns 0 if no song is playing
                currentTime: 0,
                //  API will fire a 'ready' event after initialization which indicates the player can now respond accept commands
                ready: false,
                loading: false,
                currentLoadAttempt: 1,
                //  TODO: maxLoadAttempts isn't DRY with YouTubePlayer.
                maxLoadAttempts: 10,
                state: PlayerState.Unstarted,
                //  This will be set after the player is ready and can communicate its true value.
                //  Default to 50 because having the music on and audible, but not blasting, seems like the best default if we fail for some reason.
                volume: 50,
                maxVolume: 100,
                minVolume: 0,
                //  This will be set after the player is ready and can communicate its true value.
                muted: false,
                loadedSong: null,
                playImmediately: false,
                songToActivate: null,
                youTubePlayer: null
            };
        },
        
        //  Initialize the player by creating a YouTube Player IFrame hosting an HTML5 player
        initialize: function() {
            this.on('change:volume', this._onChangeVolume);
            this.on('change:muted', this._onChangeMuted);
            this.on('change:ready', this._onChangeReady);
            this.on('change:loading', this._onChangeLoading);

            this.listenTo(this.get('youTubePlayer'), 'change:ready', this._onYouTubePlayerChangeReady);
            this.listenTo(this.get('youTubePlayer'), 'change:state', this._onYouTubePlayerChangeState);
            this.listenTo(this.get('youTubePlayer'), 'youTubeError', this._onYouTubePlayerError);
            this.listenTo(this.get('youTubePlayer'), 'change:loading', this._onYouTubePlayerChangeLoading);
            this.listenTo(this.get('youTubePlayer'), 'change:currentLoadAttempt', this._onYouTubePlayerChangeCurrentLoadAttempt);
            //this.listenTo(Streamus.channels.player.commands, 'playOnActivate', this._playOnActivate);

            chrome.runtime.onConnect.addListener(this._onChromeRuntimeConnect.bind(this));

            this._ensureInitialState();
        },

        activateSong: function(song, timeInSeconds) {
            if (this.get('ready')) {
                var playerState = this.get('state');
                var playOnActivate = this.get('playOnActivate');

                var videoOptions = {
                    videoId: song.get('id'),
                    startSeconds: timeInSeconds || 0,
                };

                //  TODO: I don't think I *always* want to keep the player going if a song is activated while one is playing, but maybe...
                if (playOnActivate || playerState === PlayerState.Playing || playerState === PlayerState.Buffering) {
                    this.get('youTubePlayer').loadVideoById(videoOptions);
                } else {
                    this.get('youTubePlayer').cueVideoById(videoOptions);
                }

                this.set({
                    loadedSong: song,
                    //  It's helpful to keep currentTime set here because the progress bar in foreground might be visually set,
                    //  but until the song actually loads -- current time isn't set.
                    currentTime: timeInSeconds || 0,
                    playOnActivate: false,
                    songToActivate: null
                });
            } else {
                this.set('songToActivate', song);
            }
        },

        toggleState: function() {
            var playing = this.get('state') === PlayerState.Playing;

            if (playing) {
                this.pause();
            } else {
                this.play();
            }
        },

        setVolume: function(volume) {
            var maxVolume = this.get('maxVolume');
            var minVolume = this.get('minVolume');

            if (volume > maxVolume) {
                volume = maxVolume;
            } else if (volume < minVolume) {
                volume = minVolume;
            }

            this.set({
                muted: false,
                volume: volume
            });
        },

        stop: function() {
            this.get('youTubePlayer').stop();

            this.set({
                loadedSong: null,
                currentTime: 0,
                state: PlayerState.Unstarted
            });
        },

        pause: function() {
            this.get('youTubePlayer').pause();
        },

        play: function() {
            if (this.get('youTubePlayer').get('ready')) {
                this.get('youTubePlayer').play();
            } else {
                this.set('playOnActivate', true);
                this.get('youTubePlayer').preload();
            }
        },

        seekTo: function(timeInSeconds) {
            if (this.get('ready')) {
                var state = this.get('state');

                //  TODO: I'd like to ensure the Player is always in the 'paused' state because seekTo will start playing
                //  if called when in the Unstarted or SongCued state.
                if (state === PlayerState.Unstarted || state === PlayerState.SongCued) {
                    this.activateSong(this.get('loadedSong'), timeInSeconds);
                } else {
                    this.get('youTubePlayer').seekTo(timeInSeconds);
                }
            } else {
                this.set('currentTime', timeInSeconds);
            }
        },
        
        refresh: function() {
            var loadedSong = this.get('loadedSong');
            if (loadedSong !== null) {
                this.activateSong(loadedSong, this.get('currentTime'));
            }
        },
        
        //  Ensure that the initial state of the player properly reflects the state of its APIs
        _ensureInitialState: function() {
            this.set('ready', this.get('youTubePlayer').get('ready'));
            this.set('loading', this.get('youTubePlayer').get('loading'));
            //  TODO: How will I handle currentLoadAttempt w/ 2+ APIs? If both are loading they could be on separate attempts...?
            this.set('currentLoadAttempt', this.get('youTubePlayer').get('currentLoadAttempt'));
        },
        
        //  Update the volume whenever the UI modifies the volume property.
        _onChangeVolume: function(model, volume) {
            if (this.get('ready')) {
                this.get('youTubePlayer').setVolume(volume);
            } else {
                this.get('youTubePlayer').preload();
            }
        },

        _onChangeMuted: function(model, muted) {
            if (this.get('ready')) {
                this.get('youTubePlayer').setMuted(muted);
            } else {
                this.get('youTubePlayer').preload();
            }
        },

        _onChangeReady: function(model, ready) {
            if (ready) {
                //  These values need to be set explicitly because the 'change' event handler won't fire if localStorage value is the same as default.
                this.get('youTubePlayer').setVolume(this.get('volume'));
                this.get('youTubePlayer').setMuted(this.get('muted'));

                //  If an 'activateSong' command came in while the player was not ready, fulfill it now. 
                var songToActivate = this.get('songToActivate');
                if (songToActivate !== null) {
                    this.activateSong(songToActivate);
                } else {
                    //  Otherwise, ensure that the currently active song is loaded into its respective API player.
                    this.refresh();
                }
            }
        },

        _onChangeLoading: function(model, loading) {
            //  Ensure player doesn't start playing a song when recovering from a bad state after a long period of time.
            //  It is OK to start playback again when recovering initially, but not OK if recovering hours later.
            if (!loading && !this.get('ready')) {
                var state = this.get('loadedSong') === null ? PlayerState.Unstarted : PlayerState.Paused;
                this.set('state', state);
            }
        },

        _onChromeRuntimeConnect: function(port) {
            if (port.name === 'youTubeIFrameConnectRequest') {
                port.onMessage.addListener(this._onYouTubeIFrameMessage.bind(this));
            }
        },

        _onYouTubeIFrameMessage: function(message) {
            //  It's better to be told when time updates rather than poll YouTube's API for the currentTime.
            if (!_.isUndefined(message.currentTime)) {
                this.set('currentTime', message.currentTime);
            }

            //  YouTube's API for seeking/buffering doesn't fire events reliably.
            //  Listen directly to the element for more responsive results.
            if (!_.isUndefined(message.seeking)) {
                if (message.seeking) {
                    if (this.get('state') === PlayerState.Playing) {
                        this.set('state', PlayerState.Buffering);
                    }
                } else {
                    if (this.get('state') === PlayerState.Buffering) {
                        this.set('state', PlayerState.Playing);
                    }
                }
            }
        },

        _onYouTubePlayerChangeReady: function(model, ready) {
            this.set('ready', ready);
        },

        _onYouTubePlayerChangeState: function(model, youTubePlayerState) {
            var playerState = this._getPlayerState(youTubePlayerState);
            this.set('state', playerState);
        },

        _onYouTubePlayerChangeLoading: function(model, loading) {
            this.set('loading', loading);
        },

        _onYouTubePlayerChangeCurrentLoadAttempt: function(model, currentLoadAttempt) {
            this.set('currentLoadAttempt', currentLoadAttempt);
        },
        
        //  TODO: In the future this should probably be generic and just emit an error which isn't tied to YouTube.
        //  Emit errors so the foreground so can notify the user.
        _onYouTubePlayerError: function(model, error) {
            this.trigger('youTubeError', this, error);
        },
        
        _playOnActivate: function(playOnActivate) {
            this.set('playOnActivate', playOnActivate);
        },
        
        //  Maps a YouTubePlayerState enumeration value to the corresponding PlayerState enumeration value.
        _getPlayerState: function(youTubePlayerState) {
            var playerState;

            switch (youTubePlayerState) {
                case YouTubePlayerState.Unstarted:
                    playerState = PlayerState.Unstarted;
                    break;
                case YouTubePlayerState.Ended:
                    playerState = PlayerState.Ended;
                    break;
                case YouTubePlayerState.Playing:
                    playerState = PlayerState.Playing;
                    break;
                case YouTubePlayerState.Paused:
                    playerState = PlayerState.Paused;
                    break;
                case YouTubePlayerState.Buffering:
                    playerState = PlayerState.Buffering;
                    break;
                //  TODO: I think that SongCued should map to Paused because Streamus doesn't really care about SongCued at all.
                case YouTubePlayerState.SongCued:
                    playerState = PlayerState.SongCued;
                    break;
                default:
                    throw new Error('Unmapped YouTubePlayerState:' + youTubePlayerState);
            }

            return playerState;
        }
    });

    return Player;
});