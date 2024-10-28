import { Component, signal, OnInit, AfterViewInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  RouterModule,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs';
import emailjs from 'emailjs-com';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit,AfterViewInit {
  firstname: string = '';
  mailid: any;
  message: string = '';
  activeMenuItem: string | null = null;

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragement = this.route.snapshot.fragment;
        if (fragement) {
          this.ScrollToFragement(fragement);
        }
      });
  }


  ngAfterViewInit(): void {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    const bootstrapCollapse = document.querySelector('.navbar-toggler') as HTMLElement;

    if (navbarCollapse && bootstrapCollapse) {
      bootstrapCollapse.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
      });
    }
  }
 

  ngOnInit(): void {
    this.activeMenuItem = 'about';
    const fragement = this.route.snapshot.fragment;
    if (fragement) {
      this.ScrollToFragement(fragement);
    } else {
      this.ScrollToFragement('about');
    }
  }

  private ScrollToFragement(fragement: string) {
    const element = document.getElementById(fragement);
    if (element) {
      const navbarHeight = document.getElementById('navbar')?.offsetHeight;
      if (navbarHeight != undefined) {
        const offset = navbarHeight + 50;
        const elementPosition = element.offsetTop - offset;

        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }
  }

  setActiveMenuItem(menuItem: string) {
    this.activeMenuItem = menuItem;
    this.collapseNavbar();
  }

  collapseNavbar(): void {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  }

  onSubmit(form: NgForm) {

    if (!this.firstname || !this.mailid || !this.message) {
      alert('Please fill in all the required fields.');
      return;
    }
    const url = 'https://sheetdb.io/api/v1/7w1358wut9t';

    const templateParams = {
      from_name: this.firstname,
      reply_to: this.mailid,
      message: this.message,
    };

    const sheetData = {
      name: this.firstname,
      email: this.mailid,
      message: this.message,
    };
    this.resetContactForm(form);

    emailjs
      .send(
        'service_zugqv1v',
        'template_a85xweo',
        templateParams,
        '8da76KOJU_jejiw3z'
      )
      .then(
        async (response) => {
          console.log('Success', response.status, response.text);
          try {
            await this.StoreDataInGoogleSheet(sheetData);
            alert('Data submitted successfully');
          } catch (error) {
            console.error('Error storing data in Google Sheets:', error);
            //this.resetContactForm(form);
          }
        },
        (error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send message. Please try again.');
          //this.resetContactForm(form);
        }
      );
  }


  async StoreDataInGoogleSheet(formData: any): Promise<void> {
    try {
      const sheetDbUrl = 'https://sheetdb.io/api/v1/7w1358wut9tjt';
      const response = await this.http
        .post(sheetDbUrl, formData)
        .pipe(
          tap((response) => console.log('Data sent successfully', response)),
          catchError((error) => {
            console.error('Error sending data', error);
            return of(null); // Handle the error and return a fallback value
          })
        )
        .toPromise(); // Convert observable to promise

      // Optionally handle the response here
    } catch (error) {
      console.error('Request failed', error);
    }
  }

  resetContactForm(form: NgForm) {
    form.resetForm();
    this.mailid = '';
    this.firstname = '';
    this.message = '';
  }

  Certificates = [
    {
      id: 'Certificate1',
      title: 'WordPress for Beginners - Master WordPress Swiftly',
      providerImg: 'udemy.svg',
      issuedDate: 'Jan 2021',
      link: 'https://www.udemy.com/certificate/UC-8614016f-5dcd-4c81-b2cb-4110f41040d3/',
    },
    {
      id: 'Certificate2',
      title: 'Learn HTML5 In-Depth-With-Real -World Examples',
      providerImg: 'udemy.svg',
      issuedDate: 'Mar 2022',
      link: 'https://www.udemy.com/certificate/UC-9a08a712-37cf-4ae2-af97-b96b83bd6c5f/',
    },
    {
      id: 'Certificate3',
      title: 'Learn CSS for beginners',
      providerImg: 'udemy.svg',
      issuedDate: 'Mar 2022',
      link: 'https://www.udemy.com/certificate/UC-4a16733b-9669-4cdc-a3d2-0ed3c5b6035c/',
    },
    {
      id: 'Certificate4',
      title: 'SQL Basic',
      providerImg: 'hackerRank.png',
      issuedDate: 'Sep 2023',
      link: 'https://www.hackerrank.com/certificates/4509fe01f954',
    },
    {
      id: 'Certificate5',
      title: 'Foundational C# with Microsoft',
      providerImg: 'freeCodeCamp.svg',
      issuedDate: 'Dec 2023',
      link: 'https://www.freecodecamp.org/certification/fcc5fc0482d-f571-403d-9c1c-35b4a3fa002e/foundational-c-sharp-with-microsoft',
    },
    {
      id: 'Certificate6',
      title: 'C# Basic',
      providerImg: 'hackerRank.png',
      issuedDate: 'Jan 2024',
      link: 'https://www.hackerrank.com/certificates/a0b36b4cfd16',
    },
    {
      id: 'Certificate7',
      title: 'Responsive Web Design',
      providerImg: 'freeCodeCamp.svg',
      issuedDate: 'Mar 2024',
      link: 'https://www.freecodecamp.org/certification/fcc5fc0482d-f571-403d-9c1c-35b4a3fa002e/responsive-web-design',
    },
    {
      id: 'Certificate8',
      title: 'Introduction to Graphic Design; Basics of UI/UX',
      providerImg: 'simplilearn.jpg',
      issuedDate: 'Mar 2024',
      link: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzNDA1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvdGh1bWJfNDk1NjAyNV8xNzEwNDc3Mzk3LnBuZyIsInVzZXJuYW1lIjoiU0lWQUtVTUFSIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6307%2FIntroduction-to-Graphic-Design%253B-Basics-of-UI%252FUX%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1324328547664065092&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVL4kyLAzNLHKJ9EgCAHjVQXMlAAAA',
    },
    {
      id: 'Certificate9',
      title: 'HTTP Essential Training',
      providerImg: 'linkedin.svg',
      issuedDate: 'May 2024',
      link: 'https://www.linkedin.com/learning/certificates/6e1645e06731c3b89a78d39c1072d096f348e9405e3e6ffb036098f1e70cb9a5?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BU3powmJ6QFiWd37SRh2Jsg%3D%3D',
    },
    {
      id: 'Certificate10',
      title: 'Git Basics',
      providerImg: 'linkedin.svg',
      issuedDate: 'May 2024',
      link: 'https://www.linkedin.com/learning/certificates/7d1bf0ec70b8949ca50ac865906afa1eca41ef053d5f135ea4e6933b99046f96?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BU3powmJ6QFiWd37SRh2Jsg%3D%3D',
    },
    {
      id: 'Certificate11',
      title: '.NET Core: Logging with log4net',
      providerImg: 'linkedin.svg',
      issuedDate: 'May 2024',
      link: 'https://www.linkedin.com/learning/certificates/9ee78ff9df06a8f14b8bbeababa32c5efdd2613c7b45347cd38f906fc3b2e3db?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BU3powmJ6QFiWd37SRh2Jsg%3D%3D',
    },
  ];
}
