import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
})
export class PlayerComponent implements OnInit {
  private track = 0;
  private path = '../assets/musics/';
  private range: any;
  private rangeBlock = false;
  private played = false;
  private refresh = false;
  private trackInfo = {
    title: '',
    artist: '',
  };

  public start = false;
  public rangePointer = 0;
  public maxRange = 0;
  public display = {
    current: '00:00',
    totalDuration: '00:00',
  };

  public player = document.createElement('audio');

  private musics = [
    {
      title: 'Shake It Off',
      artist: 'Taylor Swift',
      src: 'taylor-swift_shake-it-off.mp3',
    },
    {
      title: 'Take On Me',
      artist: 'A-Ha',
      src: 'a-ha_take-on-me.mp3',
    },
    {
      title: 'Hear Me Now',
      artist: 'Alok, Bruno Martini, feat. Zeeba',
      src: 'alok-bruno-martini-feat-zeeba_hear-me-now.mp3',
    },
    {
      title: "That's What I Like",
      artist: 'Bruno Mars',
      src: 'bruno-mars_thats-what-i-like.mp3',
    },
    {
      title: 'Como Tudo Deve Ser',
      artist: 'Charlie Brown',
      src: 'charlie-brown-jr_como-tudo-deve-ser.mp3',
    },
    {
      title: 'Hot2Touch',
      artist: 'Felix Jaehn Hight, Alex Aiono',
      src: 'felix-jaehn-hight-alex-aiono_hot2touch.mp3',
    },
    {
      title: 'I Was Made For Lovin You',
      artist: 'Kiss',
      src: 'kiss_i-was-made-for-lovin-you.mp3',
    },
    {
      title: 'Eu Me Rendo',
      artist: 'Leonardo Gonçalves',
      src: 'leonardo-goncalves_eu-me-rendo.mp3',
    },
    {
      title: 'Getsemani',
      artist: 'Leonardo Gonçalves',
      src: 'leonardo-goncalves_getsemani.mp3',
    },
    {
      title: 'I Gotta Feeling',
      artist: 'The Black Eyed Peas',
      src: 'the-black-eyed-peas_i-gotta-feeling.mp3',
    },
    {
      title: 'Where Is The Love',
      artist: 'The Black Eyed Peas',
      src: 'the-black-eyed-peas_where-is-the-love.mp3',
    },
    {
      title: 'Maniac',
      artist: 'Avantasia',
      src: 'avantasia_maniac.mp3',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.player.src = this.path + this.musics[this.track].src;
    this.setTrackInfo(
      this.musics[this.track].title,
      this.musics[this.track].artist
    );

    this.player.addEventListener('timeupdate', (plr: any) => {
      plr.stopPropagation();

      if (!this.rangeBlock) {
        this.rangePointer = this.player.currentTime;

        this.displayDraw();
      }
    });

    this.range = document.getElementById('range');
    this.range.addEventListener('mousedown', () => {
      this.rangeBlock = true;
    });
    this.range.addEventListener('mouseup', () => {
      this.rangeBlock = false;
    });
    this.range.addEventListener('touchstart', () => {
      this.rangeBlock = true;
    });
    this.range.addEventListener('touchend', () => {
      this.rangeBlock = false;
    });
  }

  ngDoCheck() {
    if (this.player.currentTime >= this.player.duration && this.refresh) {
      this.onNext();
    }
  }

  private changeTrack = () => {
    this.rangePointer = 0;
    this.player.src = this.path + this.musics[this.track].src;
    this.setTrackInfo(
      this.musics[this.track].title,
      this.musics[this.track].artist
    );
    if (this.played) {
      setTimeout(() => {
        this.onPlay();
      }, 1000);
    }
  };

  public onPlay = () => {
    this.played = true;
    this.player.play();
    this.maxRange = this.player.duration;
    this.displayDraw();
  };

  public onPause = () => {
    this.player.pause();
    this.played = false;
  };

  public onNext = () => {
    this.track++;
    if (this.track > this.musics.length - 1) {
      this.track = 0;
    }
    this.changeTrack();
  };

  public onPrev = () => {
    this.track--;
    if (this.track < 0) {
      this.track = this.musics.length - 1;
    }
    this.changeTrack();
  };

  public onRefresh = () => {
    this.refresh = !this.refresh;
  };

  public onStart = () => {
    this.setStart(!this.start);
  };

  public getRefresh = () => {
    return this.refresh;
  };

  public getTrackInfo = () => {
    return `<strong>${this.trackInfo.artist}</strong> - ${this.trackInfo.title}`;
  };

  public getPlayed = () => {
    return this.played;
  };

  public getTrack = () => {
    return this.track;
  };

  public getMusicsTotal = () => {
    return this.musics.length;
  };

  public getStart = () => {
    return this.start;
  };

  public setStart = (start: boolean) => {
    this.start = start;
  };

  private setTrackInfo = (title: string, artist: string) => {
    this.trackInfo.title = title;
    this.trackInfo.artist = artist;
  };

  public changedRange = (evt: any) => {
    this.rangePointer = evt.target.value;
    this.player.currentTime = this.rangePointer;
    this.displayDraw();
  };

  private displayDraw = () => {
    let currentMinutes: any = Math.floor(this.player.currentTime / 60);
    let currentSeconds: any = Math.floor(
      this.player.currentTime - currentMinutes * 60
    );
    let durationMinutes: any = Math.floor(this.player.duration / 60);
    let durationSeconds: any = Math.floor(
      this.player.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = '0' + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = '0' + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = '0' + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = '0' + durationMinutes;
    }

    this.display.current =
      (currentMinutes || '00') + ':' + (currentSeconds || '00');
    this.display.totalDuration =
      (durationMinutes || '00') + ':' + (durationSeconds || '00');
  };
}
