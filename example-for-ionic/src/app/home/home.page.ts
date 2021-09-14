import { Component, OnInit } from '@angular/core';
import { KakaoService } from '../kakao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private kakao: KakaoService) {}

  ngOnInit() {}
  clickKakao() {
    this.kakao.login().then(access_token => {
      console.log('access_token', access_token);
    });
  }
}
