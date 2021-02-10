import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
})
export class PlayerComponent implements OnInit, OnChanges {
  private musics = [
    {
      title: 'Alok, Bruno Martini, feat. Zeeba - Hear Me Now',
      src: 'alok-bruno-martini-feat-zeeba_hear-me-now.mp3',
    },
    {
      title: "Bruno Mars - That's What I Like",
      src: 'bruno-mars_thats-what-i-like.mp3',
    },
    // {
    //   title: "Alok, Bruno Martini, feat. Zeeba Hear Me Now",
    //   src: "alok-bruno-martini-feat-zeeba_hear-me-now.mp3"
    // },
    // {
    //   title: "Alok, Bruno Martini, feat. Zeeba Hear Me Now",
    //   src: "alok-bruno-martini-feat-zeeba_hear-me-now.mp3"
    // },
    // {
    //   title: "Alok, Bruno Martini, feat. Zeeba Hear Me Now",
    //   src: "alok-bruno-martini-feat-zeeba_hear-me-now.mp3"
    // },
    // {
    //   title: "Alok, Bruno Martini, feat. Zeeba Hear Me Now",
    //   src: "alok-bruno-martini-feat-zeeba_hear-me-now.mp3"
    // },
    // {
    //   title: "Alok, Bruno Martini, feat. Zeeba Hear Me Now",
    //   src: "alok-bruno-martini-feat-zeeba_hear-me-now.mp3"
    // },
  ];

  private track = 0;
  private path = '../assets/musics/';
  public range = 0;
  public rge: any;
  public maxRange = 0;
  public player = document.createElement('audio');

  constructor() {}

  ngOnInit(): void {
    this.player.src = this.path + this.musics[this.track].src;

    this.player.addEventListener('timeupdate', (plr: any) => {
      this.range = this.player.currentTime;
    });

    this.rge = document.getElementById('range');
    this.rge.addEventListener('mousedown', (el: any) => {
      //   this.range = el.target.value;
      //   this.player.currentTime = el.target.value;

      this.player.removeEventListener;
    });
  }

  ngDoCheck() {
    // this.range = this.player.currentTime;
  }

  private changeTrack = () => {
    this.player.src = this.path + this.musics[this.track].src;
  };

  public onPlay = () => {
    this.player.play();
    this.maxRange = this.player.duration;
  };

  public onPause = () => {
    this.player.pause();
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
    this.player.currentTime = evt.target.value;
  };
}
