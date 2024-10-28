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
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit{
  activeCategory: string = 'All';
  displayedProject: {
    title: string;
    year: string;
    image: string;
    description: string;
    technologies: string[];
    details: string[];
    codeLink: string;
    projectLink: string;
    Category: string;
  }[] = [];

  ngOnInit(): void {
    this.displayedProject = this.projects;
  }

  getModalId(title: string): string {
    return title.replace(/\s/g, '');
  }
  

  filterProjects(category: string) {
    this.activeCategory = category;
    if (category === 'All') {
      this.displayedProject = this.projects;
    } else {
      this.displayedProject = this.projects.filter(
        (project) => project.Category === category
      );
    }
  }
  projects = [
    {
      title: 'Calculator',
      year: '2023',
      image: 'calci.png',
      description:
        'Developed a fully functional calculator application using Angular and TypeScript, providing users with a seamless and intuitive calculation experience.',
      technologies: ['HTML', 'CSS', 'Bootstrap', 'Angular'],
      details: [
        'Developed a fully functional calculator application using Angular and TypeScript.',
        'Ensured a seamless and intuitive calculation experience for users.',
        'Implemented responsive design principles for optimal usability on desktops, tablets, and smartphones.',
        'Utilized TypeScript to enhance code maintainability and readability.',
        'Used HTML, CSS, and Bootstrap to create a clean and user-friendly interface.',
        'Highlighted ability to create robust and user-centric applications with modern web technologies.',
      ],
      codeLink: 'https://github.com/websiva/calculator', // Provide the URL for the code repository
      projectLink: 'https://calculator.websiva.online/',
      Category: 'Angular',
    },
    {
      title: 'Temperature Converter',
      year: '2023',
      image: 'temperature_converter.png',
      description:
        'Developed a fully functional tDeveloped a simple temperature converter from Fahrenheit to Celsius or Celsius to Fahrenheit. Here Angular, HTML, CSS, Bootstrap, and Angular Material.',
      technologies: ['HTML', 'CSS', 'Bootstrap', 'Angular'],
      details: [
        'Developed an Angular application that efficiently converts temperatures from Fahrenheit to Celsius, providing accurate and instant results.',
        'Designed a clean and simple user interface that allows users to input Fahrenheit values and receive Celsius conversions with ease.',
        'Implemented real-time conversion functionality, ensuring that users receive immediate feedback as they enter temperature values.',
        'Utilized Bootstrap to create a responsive design, ensuring the temperature converter app functions seamlessly across various devices and screen sizes.',
        'Created the application as an educational tool to help users understand the relationship between Fahrenheit and Celsius, enhancing their knowledge of temperature measurement systems.',
        'Highlighted ability to create robust and user-centric applications with modern web technologies.',
      ],
      codeLink: 'https://github.com/websiva/temperature-converter',
      projectLink: 'https://temperatureconverter.websiva.online/',
      Category: 'Angular',
    },
    {
      title: 'E-Commerce',
      year: '2023',
      image: 'e-commerce.jpg',
      description:
        'Developed a fully functional tDeveloped a simple temperature converter from Fahrenheit to Celsius or Celsius to Fahrenheit. Here Angular, HTML, CSS, Bootstrap, and Angular Material.',
      technologies: ['HTML', 'CSS', 'Bootstrap', 'Angular', 'API'],
      details: [
        'Developed an Angular e-commerce application that offers a seamless shopping experience, complete with product listings, detailed descriptions, and an intuitive shopping cart.',
        'Leveraged an external free API to dynamically fetch and display product data, ensuring the application always has up-to-date inventory and pricing information.',
        'Designed a user-centric interface with Angular, providing easy navigation and a smooth shopping experience for users, from browsing products to completing purchases.',
        'Implemented a responsive design using Bootstrap, ensuring the e-commerce app is accessible and functional across all devices and screen sizes.',
        'Included features such as product search, filtering, and sorting options, along with secure user authentication and payment processing, to enhance the overall functionality and usability of the e-commerce platform.',
      ],
      codeLink: 'https://github.com/websiva/E-commerce-', // Provide the URL for the code repository
      projectLink: 'https://ecommerce.websiva.online/',
      Category: 'Angular',
    },
    {
      title: 'Currency Trends',
      year: '2023',
      image: 'currency-trends.png',
      description:
        'Discover how currencies change with economic shifts. Select a currency, see its price history, and gain insights for smart decisions. Step into Currency Chronicles – where every price tells a story.',
      technologies: ['HTML', 'CSS', 'Bootstrap', 'Angular', 'API'],
      details: [
        'Developed an Angular application that provides detailed visualizations of the last 15 days history of world currencies, enabling users to track and analyze currency trends efficiently.',
        'Utilized a robust tech stack including Angular, Bootstrap, HTML5, REST APIs, CSS, and TypeScript to create a responsive and dynamic web application.',
        'Integrated multiple REST APIs to fetch real-time currency data, ensuring users have access to the most current and accurate financial information.',
        'Utilized TypeScript to enhance code maintainability and readability.',
        'Used HTML, CSS, and Bootstrap to create a clean and user-friendly interface.',
        'Highlighted ability to create robust and user-centric applications with modern web technologies.',
      ],
      codeLink: 'https://github.com/websiva/currencyhistory', // Provide the URL for the code repository
      projectLink: 'https://currencytrends.websiva.online/',
      Category: 'Angular',
    },
    {
      title: 'Pokemon Search',
      year: '2024',
      image: 'pokemon-search.png',
      description:
        'Developed a Pokémon Search App utilizing the fetch API to retrieve and display information about Pokémon based on user input.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
      details: [
        'Implemented the fetch API to make network requests and retrieve Pokémon data from an external source.',
        'Enabled users to search for specific Pokémon by inputting their names or IDs.',
        'Processed and displayed Pokémon details such as names, types, and abilities based on the search results.',
        'Designed an intuitive interface allowing users to interact with the app and view search results effectively.',
        'Incorporated error handling to manage cases where the Pokémon search might return no results or encounter issues with the API.',
      ],
      codeLink: 'https://github.com/websiva/Pokemon_search', // Provide the URL for the code repository
      projectLink: 'http://pokemon-search.websiva.online/',
      Category: 'JavaScript',
    },
    {
      title: '3D Buttons',
      year: '2024',
      image: '3D_button.png',
      description:
        'Developed 3D social media icons using basic HTML and CSS, utilizing CSS pseudo-elements for enhanced visual effects.',
      technologies: ['HTML', 'CSS'],
      details: [
        'Created visually engaging 3D social media icons using HTML and CSS.',
        'Utilized CSS pseudo-elements to add depth and dimension to the icons.',
        'Ensured compatibility and responsiveness across different devices and screen sizes.',
        'Focused on providing an interactive and aesthetically pleasing user experience.',
        'Demonstrated expertise in crafting detailed and animated UI elements using modern web technologies.',
      ],
      codeLink: 'https://github.com/websiva/3D-Button-Hover-Effect', // URL for the code repository
      projectLink: 'https://websiva.github.io/3D-Button-Hover-Effect/',
      Category: 'HTML_CSS',
    },
    {
      title: '3D Card Hover Effect',
      year: '2024',
      image: '3D_card_hover_effect.png',
      description:
        'Designed a 3D hover effect card using HTML and CSS, where elements pop out on hover, creating an interactive and visually appealing experience. The effect is achieved with smooth transitions and responsive design, all implemented using pure CSS.',
      technologies: ['HTML', 'CSS'],
      details: [
        'Created a 3D hover effect where images and elements pop out of the card, enhancing user interaction.',
        'Implemented smooth transitions using CSS to ensure visually appealing movements and appearance changes.',
        'Applied the CSS perspective property to give elements a realistic 3D appearance during transformations.',
        'Utilized CSS pseudo-elements (::before and ::after) to add extra layers and effects, such as shadows and gradients, contributing to the overall depth and richness of the hover effect.',
        'Ensured responsive design through the use of CSS variables, allowing for easy adjustments and scalability across different screen sizes.',
      ],
      codeLink: 'https://github.com/websiva/3D-Card-Hover-Effect', // URL for the code repository
      projectLink: 'https://websiva.github.io/3D-Card-Hover-Effect/',
      Category: 'HTML_CSS',
    },
    {
      title: 'Animated Button',
      year: '2024',
      image: 'Animated_button.png',
      description:
        'Designed an animated button with a dynamic border effect using HTML and CSS. The button features smooth transitions and is fully responsive, showcasing the power of pure CSS for creating interactive UI elements.',
      technologies: ['HTML', 'CSS'],
      details: [
        'Created an animated border effect for buttons to enhance visual appeal and user interaction.',
        'Implemented smooth CSS transitions for a fluid and engaging user experience.',
        'Utilized CSS pseudo-elements to create the dynamic border animations.',
        'Ensured the design is fully responsive and adaptable to different screen sizes.',
        'Showcased the potential of pure CSS in creating visually appealing and interactive components without relying on JavaScript.',
      ],
      codeLink: 'https://github.com/websiva/Responsive-Button-Effect', // URL for the code repository
      projectLink: 'https://websiva.github.io/Responsive-Button-Effect/',
      Category: 'HTML_CSS',
    },
    {
      title: 'Cash Register App',
      year: '2024',
      image: 'cash_register.png',
      description:
        'Developed a Pokémon Search App utilizing the fetch API to retrieve and display information about Pokémon based on user input.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      details: [
        'Implemented the fetch API to make network requests and retrieve Pokémon data from an external source.',
        'Enabled users to search for specific Pokémon by inputting their names or IDs.',
        'Processed and displayed Pokémon details such as names, types, and abilities based on the search results.',
        'Designed an intuitive interface allowing users to interact with the app and view search results effectively.',
        'Incorporated error handling to manage cases where the Pokémon search might return no results or encounter issues with the API.',
      ],
      codeLink: 'https://github.com/websiva/Cash-register-app', // Provide the URL for the code repository
      projectLink: 'https://websiva.github.io/Cash-register-app/',
      Category: 'JavaScript',
    },
  ];

}
