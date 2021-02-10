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
  public display = {
    current: '00:00',
    totalDuration: '00:00',
  };

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

  private changeTrack = () => {
    this.player.src = this.path + this.musics[this.track].src;
    if (this.played) {
      this.onPlay();
    }
    this.displayDraw();
  };

  public onPlay = () => {
    this.played = true;
    this.maxRange = this.player.duration;
    this.player.play();
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
    this.displayDraw();
  };

  private displayDraw = () => {
    let seekPosition = this.player.currentTime * (100 / this.player.duration);
    let value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes: any = Math.floor(seekPosition / 60);
    let currentSeconds: any = Math.floor(seekPosition - currentMinutes * 60);
    let durationMinutes: any = Math.floor(this.player.duration / 60);
    let durationSeconds: any = Math.floor(
      this.player.duration - durationMinutes * 60
    );

    // Add a zero to the single digit time values
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

    // Display the updated duration
    this.display.current = currentMinutes + ':' + currentSeconds;
    this.display.totalDuration = durationMinutes + ':' + durationSeconds;
  };
}
