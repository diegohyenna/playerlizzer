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
  private title = '';

  public rangePointer = 0;
  public maxRange = 0;
  public display = {
    current: '00:00',
    totalDuration: '00:00',
  };

  public player = document.createElement('audio');

  private musics = [
    {
      title: 'A-Ha - Take On Me',
      src: 'a-ha_take-on-me.mp3',
    },
    {
      title: 'Alok, Bruno Martini, feat. Zeeba - Hear Me Now',
      src: 'alok-bruno-martini-feat-zeeba_hear-me-now.mp3',
    },
    {
      title: "Bruno Mars - That's What I Like",
      src: 'bruno-mars_thats-what-i-like.mp3',
    },
    {
      title: 'Charlie Brown - Como Tudo Deve Ser',
      src: 'charlie-brown-jr_como-tudo-deve-ser.mp3',
    },
    {
      title: 'Felix Jaehn Hight Alex Aiono - Hot2Touch',
      src: 'felix-jaehn-hight-alex-aiono_hot2touch.mp3',
    },
    {
      title: 'Kiss - I Was Made For Lovin You',
      src: 'kiss_i-was-made-for-lovin-you.mp3',
    },
    {
      title: 'Leonardo Gonçalves - Eu Me Rendo',
      src: 'leonardo-goncalves_eu-me-rendo.mp3',
    },
    {
      title: 'Leonardo Gonçalves - Getsemani',
      src: 'leonardo-goncalves_getsemani.mp3',
    },
    {
      title: 'The Black Eyed Peas - I Gotta Feeling',
      src: 'the-black-eyed-peas_i-gotta-feeling.mp3',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.player.src = this.path + this.musics[this.track].src;
    this.setTitle(this.musics[this.track].title);

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
  }

  ngDoCheck() {
    if (this.player.currentTime >= this.player.duration && this.refresh) {
      this.onNext();
    }
  }

  private changeTrack = () => {
    this.rangePointer = 0;
    this.player.src = this.path + this.musics[this.track].src;
    this.setTitle(this.musics[this.track].title);
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

  public getRefresh = () => {
    return this.refresh;
  };

  public getTitle = () => {
    return this.title;
  };

  public getPlayed = () => {
    return this.played;
  };

  private setTitle = (title: string) => {
    this.title = title;
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
