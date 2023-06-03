// images
import YourLogo from '../src/assets/img/header/logo.webp'
import PrivateSesh from '../src/assets/img/workouts/private.png';
import GroupSesh from '../src/assets/img/workouts/group.png';
import Recruiting from '../src/assets/img/workouts/recruiting.png';
import CommunityImg1 from '../src/assets/img/community/img1.png';
import CommunityImg2 from '../src/assets/img/community/img2.png';
import CommunityImg3 from '../src/assets/img/community/img3.png';
import CommunityImg4 from '../src/assets/img/community/img4.png';
import JoinImg from '../src/assets/img/join/demetri-stance.png';

// icons
import UsersIcn from '../src/assets/img/about/icons/users-icn.svg';
import CalendarIcn from '../src/assets/img/workouts/icons/calendar.svg';
import PriceIcn from '../src/assets/img/pricing/icons/price.svg';
import CommunityIcn from '../src/assets/img/community/icons/community-icn.svg';
import QuestionMarkIcn from '../src/assets/img/faq/icons/question-mark.svg';

export const header = {
  logo: YourLogo,
  btnLoginText: 'Log in',
  btnSignupText: 'Sign Up',
  btnSignoutText: 'sign out'
};

export const nav = [
  { name: 'Home', id: 'banner-link' },
  { name: 'About', id: 'about-link' },
  { name: 'Workouts', id: 'workouts-link' },
  { name: 'Pricing', id: 'pricing-link' },
  { name: 'Community', id: 'community-link' },
  { name: 'FAQ', id: 'faq-link' },
];

export const banner = {
  titlePart1: "Run, don't walk to your future",
  titlePart2: '– Lead by example.',
  subtitle:
    'Nurturing champions through passion, guidance, and joyful play.',
  textBtn: 'Join Now',
  img: '',
};

export const about = {
  icon: UsersIcn,
  title: 'Our misson',
  subtitle1:
    'At Be a Leader Football Training Camp, we are committed to nurturing the next generation of exceptional football players and leaders. We aim to create an environment where athletes can unlock their full potential, develop invaluable life skills, and leave a positive impact on the football community and beyond. Join us on this transformative journey and become a leader both on and off the field. ',
  subtitle2:
    'We believe that football is not just a sport but an experience that creates lasting memories and bonds. ',
  link: 'Join Now',
};

export const workouts = {
  icon: CalendarIcn,
  title: 'Training programs',
  programs: [
    {
      image: PrivateSesh,
      name: 'Private Sessions',
    },
    {
      image: GroupSesh,
      name: 'Group Sessions',
    },
    {
      image: Recruiting,
      name: 'Recruiting Help & Advice',
    },
  ],
};

export const pricing = {
  icon: PriceIcn,
  title: 'Pricing plan',
  plans: [
    {
      name: 'Private',
      price: '40',
      list: [
        { name: 'Hour-long session - 1 or 2 athletes' },
        { name: 'Individualized feedback and correction' },
        { name: 'Conditioning and physical development' },
        { name: 'Tailored skill development' },
      ],
      delay: 600,
    },
    {
      name: 'Group',
      price: '25',
      list: [
        { name: 'Hour and a half session' },
        { name: 'Teamwork and communications' },
        { name: 'Small-sided games and drills' },
        { name: 'Game-related scenarios and simulations' },
        { name: 'Competitive drills and challenges' },
      ],
      delay: 800,
    },
    {
      name: 'Recruiting',
      price: '99',
      list: [
        { name: '* Offered for high school Sophomores, Juniors and Seniors' },
        { name: 'Player profile development' },
        { name: 'Performance evaluation and improvement plan' },
        { name: 'Recruiting timeline and guidelines' },
        { name: 'Video analysis and highlight reels' },
      ],
      delay: 1000,
    },
  ],
};

export const community = {
  icon: CommunityIcn,
  title: 'Community',
  testimonials: [
    {
      image: CommunityImg1,
      name: 'Mark A.',
      message:
        '“Great location, great price and great, helpful people. What to want more?”',
    },
    {
      image: CommunityImg2,
      name: 'Lauren K.',
      message:
        '“Be a Leader changed my life. Not only physically but mentally as well. I’m a better athele, and all around better human being!.”',
    },
    {
      image: CommunityImg3,
      name: 'Jhon D.',
      message:
        '“Love these workouts! Trainers are knowledgeable and motivating. Demitri is wonderful!”',
    },
    {
      image: CommunityImg4,
      name: 'Anne R.',
      message:
        '“Love these workouts! Trainers are knowledgeable and motivating. Demitri is wonderful!”',
    },
  ],
};

export const faq = {
  icon: QuestionMarkIcn,
  title: 'FAQ',
  accordions: [
    {
      question: 'How can I book a session?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.',
    },
    {
      question: 'Can I pay by cash for my session?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.',
    },
    {
      question: 'What age do I need to be to join?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.',
    },
    {
      question: 'Are there any prerequisites or skill levels required to participate in the camp?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.',
    },
    {
      question: 'How do I cancel my session?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.',
    },
    {
      question: 'Is there gatorade or powerade?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.',
    },
  ],
};

export const join = {
  image: JoinImg,
  title: 'hi',
  subtitle:
    'We’ll keep you updated on the things you need to know about Be A Leader. Nothing more, nothing less.',
  btnText: 'Join now',
};

export const footer = {
  logo: YourLogo,
  copyrightText: 'All rights reserved. Be A Leader 2023.',
};

export const loginPage = {
  title: 'Log in',
  errorMessage: 'email or password incorrect',
  formSubmitBtn: 'Submit'
};

export const signupPage = {
  title: 'Sign up',
  formSubmitBtn: 'Submit',
};

export const forgotPassword = {
  title: 'Forgot Your Password?',
  success: 'Success! Check your email for reset link',
  formSubmitBtn: 'Send code to email',
  btnLoginText: 'Log in'
};

export const resetPassword = {
  title: 'Reset Password',
  success: 'Success! You may now login',
  btnLoginText: 'Log in',
  newPasswordLabel: 'New Password',
  confirmPasswordLabel: 'Confirm Password',
  formSubmitBtn: 'Submit'
};

export const error404 = {
  ErrorMessage: 'Oops something went wrong...'
}