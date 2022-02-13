import { TestBed, getTestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { OpinionsComponent } from './opinions.component';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from 'src/app/services/data-api.service';

describe('Opinion Component', () => {
  let component: OpinionsComponent;
  let injector: TestBed;
  let service: DataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataApiService],
      imports: [HttpClientModule]
    });
    injector = getTestBed();
    service = injector.get(DataApiService);

    component = new OpinionsComponent(service);
  });

  it('Create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should call OnInit', () => {
    component.ngOnInit();
    expect(component.isLoaded).toBeFalsy();
  });

  it('Should get all opinions at home (over 3)', () => {
    const dummyData =
    {
      "cod": "200",
      "allOpinions": [
        {
          "id": 18,
          "home": 1,
          "image": "default-avatar.png",
          "name": "Dummy Name",
          "commentary": "<p>Comentario</p>",
          "rating": 1,
          "create_date": "2021-08-14 14:59:34",
          "update_date": "2021-10-27 19:12:05"
        },
        {
          "id": 17,
          "home": 1,
          "image": "default-avatar.png",
          "name": "Dummy Name",
          "commentary": "<p><i>Lorem ipsum dolor sit amet</i>, consectetur adipiscing elit. Cras ac eleifend nibh. Integer eget ipsum nisl. Cras laoreet porttitor ipsum. Sed sit amet semper nisi. Nullam euismod neque neque, vitae lobortis eros posuere faucibus. In ultricies condimentum auctor. Fusce placerat cursus quam quis dignissim. Integer nec tincidunt ex. Phasellus in elit mi. Aenean at risus vel arcu fringilla laoreet porttitor in leo. Cras in dolor quis turpis lacinia rhoncus. Ut vestibulum, ligula at finibus vestibulum, elit mauris convallis sapien, dictum dignissim leo justo at urna.</p>",
          "rating": 3,
          "create_date": "2021-08-05 18:27:38",
          "update_date": "2021-10-09 13:29:53"
        },
        {
          "id": 16,
          "home": 1,
          "image": "06052021-609422ad8a7b3-perfil-avatar.jpg",
          "name": "Dummy Name",
          "commentary": "<p><strong>Crask</strong> ac eleifend nibh. Integer eget ipsum nisl. Cras laoreet porttitor ipsum. Sed sit amet semper nisi. Nullam euismod neque neque, vitae lobortis eros posuere faucibus. In ultricies condimentum auctor. Fusce placerat cursus dignissim. Integer nec tincidunt ex.</p>",
          "rating": 3,
          "create_date": "2021-05-06 19:09:01",
          "update_date": "2021-10-09 12:32:51"
        },
        {
          "id": 12,
          "home": 1,
          "image": "default-avatar.png",
          "name": "Dummy Name",
          "commentary": "<p>Opinión del usuario.</p>",
          "rating": 5,
          "create_date": "2021-03-15 20:12:26",
          "update_date": "2021-10-10 12:47:34"
        }
      ]
    };

    const spy = spyOn(service, 'getAllOpinions').and.returnValue(of(dummyData));

    component.getAllOpinions();

    expect(component.opnInHome).toEqual(dummyData.allOpinions);
    expect(component.isLoaded).toBeTruthy();
  });

  it('Should get all opinions at home (less than 3)', () => {
    const dummyData =
    {
      "cod": "200",
      "allOpinions": [
        {
          "id": 18,
          "home": 1,
          "image": "default-avatar.png",
          "name": "Dummy Name",
          "commentary": "<p>Comentario</p>",
          "rating": 1,
          "create_date": "2021-08-14 14:59:34",
          "update_date": "2021-10-27 19:12:05"
        },
        {
          "id": 17,
          "home": 1,
          "image": "default-avatar.png",
          "name": "Dummy Name",
          "commentary": "<p><i>Lorem ipsum dolor sit amet</i>, consectetur adipiscing elit. Cras ac eleifend nibh. Integer eget ipsum nisl. Cras laoreet porttitor ipsum. Sed sit amet semper nisi. Nullam euismod neque neque, vitae lobortis eros posuere faucibus. In ultricies condimentum auctor. Fusce placerat cursus quam quis dignissim. Integer nec tincidunt ex. Phasellus in elit mi. Aenean at risus vel arcu fringilla laoreet porttitor in leo. Cras in dolor quis turpis lacinia rhoncus. Ut vestibulum, ligula at finibus vestibulum, elit mauris convallis sapien, dictum dignissim leo justo at urna.</p>",
          "rating": 3,
          "create_date": "2021-08-05 18:27:38",
          "update_date": "2021-10-09 13:29:53"
        }
      ]
    };

    const spy = spyOn(service, 'getAllOpinions').and.returnValue(of(dummyData));

    component.getAllOpinions();

    expect(component.opnInHome).toEqual(dummyData.allOpinions);
    expect(component.isLoaded).toBeTruthy();
  });

  it('Show commentary', () => {
    component.userComment = {
      nativeElement: jasmine.createSpyObj('nativeElement', ['scrollIntoView', 'style'])
    };
    component.openComment('DummyName', 'DummyCommentary');

    expect(component.classComment).toEqual('row mt-3 opinion-comment-bl animated fadeInUp');
    expect(component.testContent).toEqual("<b>DummyName</b> DummyCommentary");
  });

  it('Hide commentary', () => {
    jasmine.clock().install();
    component.onCloseComment();
    jasmine.clock().tick(1500);

    expect(component.classComment).toEqual('row mt-3 opinion-comment-bl animated fadeOutDown');
    expect(component.testContent).toEqual("");
    jasmine.clock().uninstall();
  });

  it('Display review stars', () => {
    const res = component.counter(5);
    expect(res.length).toEqual(5);
  });
});
