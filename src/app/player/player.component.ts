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

  public rangePointer = 0;
  public maxRange = 0;

  public player = document.createElement('audio');

  private musics = [
    {
      title: 'Alok, Bruno Martini, feat. Zeeba - Hear Me Now',
      src: 'alok-bruno-martini-feat-zeeba_hear-me-now.mp3',
    },
    {
      title: "Bruno Mars - That's What I Like",
      src: 'bruno-mars_thats-what-i-like.mp3',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.player.src = this.path + this.musics[this.track].src;

    this.player.addEventListener('timeupdate', (plr: any) => {
      plr.stopPropagation();
      if (!this.rangeBlock) {
        this.rangePointer = this.player.currentTime;
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

  private changeTrack = () => {
    this.player.src = this.path + this.musics[this.track].src;
    if (this.played) {
      this.onPlay();
    }
  };

  public onPlay = () => {
    this.player.play();
    this.played = true;
    this.maxRange = this.player.duration;
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

  public changedRange = (evt: any) => {
    this.rangePointer = evt.target.value;
    this.player.currentTime = this.rangePointer;
  };
}
