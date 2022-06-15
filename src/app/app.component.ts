import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }),
          ],
          { optional: true }
        ),

        // query(':enter', [
        //   style({ opacity: 0})
        // ], { optional: true }),

        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(-50px)',
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'translateX(50px)',
                opacity: 0,
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }),
          ],
          { optional: true }
        ),

        // query(':enter', [
        //   style({ opacity: 0})
        // ], { optional: true }),

        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(50px)',
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'translateX(-50px)',
                opacity: 0,
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition('* => secondary', [
        transition(':decrement', [
          style({
            position: 'relative',
            overflow: 'hidden',
          }),

          query(
            ':enter, :leave',
            [
              style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }),
            ],
            { optional: true }
          ),

          // query(':enter', [
          //   style({ opacity: 0})
          // ], { optional: true }),

          group([
            query(
              ':leave',
              [
                animate(
                  '200ms ease-in',
                  style({
                    opacity: 0,
                    transform: 'translateX(50px)',
                  })
                ),
              ],
              { optional: true }
            ),

            query(
              ':enter',
              [
                style({
                  transform: 'translateX(-50px)',
                  opacity: 0,
                }),
                animate(
                  '250ms 120ms ease-out',
                  style({
                    opacity: 1,
                    transform: 'translateX(0)',
                  })
                ),
              ],
              { optional: true }
            ),
          ]),
        ]), // TODO Animate root transitions
      ]),
    ]), // TODO Animate background change
  ],
})
export class AppComponent implements OnInit {
  bg: string =
    'https://images.unsplash.com/photo-1623333769926-a34d46b5fbdb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80';

  loadingBGImage!: boolean;

  dateTime!: Observable<Date>;

  ngOnInit(): void {
    // this.dateTime = new Date();

    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab'];
      if (!tab) return 'secondary';
      return tab;
    }
  }

  async changeBGImage() {
    this.loadingBGImage = true;
    const result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD', //GET downloads image, HEAD returns the url
    });

    // if (result.url === this.bg) return this.changeBGImage();

    this.bg = result.url;
  }

  // onBGImageLoad(imgEvent: Event = null!) {
  //   const imgElement = imgEvent.target;
  //   console.log(imgElement);

  //   this.loadingBGImage = false;
  // }

  onBGImageLoad() {
    // const imgElement = imgEvent.target;
    // console.log(imgElement);

    this.loadingBGImage = false;

    console.log(this.bg);
  }
}
