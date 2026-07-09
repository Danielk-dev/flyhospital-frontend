<template>
    <main>
        <!-- Hero Section -->
        <section class="fly-hero-section">
            <div class="container">
                <div class="row align-items-center g-5">
                    <div class="col-lg-6">
                        <div class="fly-hero-content">
                            <h1>Grow Global Reach with ClickHospitals</h1>
                            <p>Showcase your hospital to thousands of international patients actively seeking care.
                                Create
                                your public profile, highlight your expertise, and start receiving patient inquiries
                                today.
                            </p>
                            <NuxtLink to="/auth/signup" class="btn btn-primary fly-btn-primary">
                                Get Started
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="col-lg-6 text-center"><img src="~/assets/img/map.png" alt="World map" class="img-fluid">
                    </div>
                </div>
            </div>
        </section>

        <!-- Partners Section -->
        <section class="fly-partners-section">
            <div class="container">
                <h3>Join the world's best hospitals network</h3>
                <div class="fly-logo-grid">
                    <img src="~/assets/img/logo1.png" alt="UHN Logo">
                    <img src="~/assets/img/logo2.png" alt="Mount Sinai Logo">
                    <img src="~/assets/img/logo3.png" alt="Alberta Health Services Logo">
                    <img src="~/assets/img/logo4.png" alt="Massachusetts General Hospital Logo">
                    <img src="~/assets/img/logo5.png" alt="Johns Hopkins Medicine Logo">
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="fly-features-section">
            <div class="container">
                <h2>How to start partnership</h2>
                <div class="row g-5">
                    <div class="col-lg-4 col-md-6 d-flex">
                        <div class="fly-feature-card w-100">
                            <div class="fly-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M42 42L33.028 33.012M38 21C38 25.5087 36.2089 29.8327 33.0208 33.0208C29.8327 36.2089 25.5087 38 21 38C16.4913 38 12.1673 36.2089 8.97919 33.0208C5.79107 29.8327 4 25.5087 4 21C4 16.4913 5.79107 12.1673 8.97919 8.97919C12.1673 5.79107 16.4913 4 21 4C25.5087 4 29.8327 5.79107 33.0208 8.97919C36.2089 12.1673 38 16.4913 38 21Z"
                                        stroke="#053862" stroke-width="4" stroke-linecap="round" />
                                </svg>

                            </div>
                            <h5>Online visibility</h5>
                            <p>You'll get access to international patients flow from 210+ countries with your personal
                                profile.</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 d-flex">
                        <div class="fly-feature-card w-100">
                            <div class="fly-icon">
                                <svg width="49" height="48" viewBox="0 0 49 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44.5 44H4.5" stroke="#053862" stroke-width="3" stroke-linecap="round" />
                                    <path
                                        d="M34.5 44V12C34.5 8.228 34.5 6.344 33.328 5.172C32.156 4 30.272 4 26.5 4H22.5C18.728 4 16.844 4 15.672 5.172C14.5 6.344 14.5 8.228 14.5 12V44M42.5 44V17C42.5 14.192 42.5 12.786 41.826 11.778C41.5341 11.3411 41.1589 10.9659 40.722 10.674C39.714 10 38.308 10 35.5 10M6.5 44V17C6.5 14.192 6.5 12.786 7.174 11.778C7.46591 11.3411 7.84106 10.9659 8.278 10.674C9.286 10 10.692 10 13.5 10"
                                        stroke="#053862" stroke-width="3" />
                                    <path
                                        d="M24.5 44V38M20.5 24H28.5M11.5 22H14.5M11.5 28H14.5M34.5 22H37.5M34.5 28H37.5M11.5 16H14.5M34.5 16H37.5M20.5 30H28.5"
                                        stroke="#053862" stroke-width="3" stroke-linecap="round" />
                                    <path d="M24.5 18V10M28.5 14H20.5" stroke="#053862" stroke-width="3"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <h5>Patient bookings</h5>
                            <p>You'll get only validated requests. The conversion rate from requests into bookings is
                                12-32%.</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 d-flex">
                        <div class="fly-feature-card w-100">
                            <div class="fly-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z"
                                        stroke="#053862" stroke-width="3" />
                                    <path
                                        d="M27.5309 4.304C26.7969 4 25.8649 4 24.0009 4C22.1369 4 21.2049 4 20.4709 4.304C19.9853 4.50503 19.544 4.79979 19.1723 5.17145C18.8007 5.5431 18.5059 5.98436 18.3049 6.47C18.1209 6.916 18.0469 7.438 18.0189 8.196C18.0059 8.74386 17.8541 9.27946 17.5778 9.75271C17.3015 10.226 16.9096 10.6214 16.4389 10.902C15.9605 11.1695 15.4221 11.3113 14.874 11.3141C14.3259 11.3169 13.786 11.1806 13.3049 10.918C12.6329 10.562 12.1469 10.366 11.6649 10.302C10.6135 10.1637 9.5503 10.4486 8.7089 11.094C8.0809 11.58 7.6129 12.386 6.6809 14C5.7489 15.614 5.2809 16.42 5.1789 17.21C5.11017 17.7309 5.14474 18.2602 5.28063 18.7678C5.41653 19.2753 5.65108 19.7511 5.9709 20.168C6.2669 20.552 6.6809 20.874 7.3229 21.278C8.2689 21.872 8.8769 22.884 8.8769 24C8.8769 25.116 8.2689 26.128 7.3229 26.72C6.6809 27.126 6.2649 27.448 5.9709 27.832C5.65108 28.2489 5.41653 28.7247 5.28063 29.2322C5.14474 29.7398 5.11017 30.2691 5.1789 30.79C5.2829 31.578 5.7489 32.386 6.6789 34C7.6129 35.614 8.0789 36.42 8.7089 36.906C9.12577 37.2258 9.60157 37.4604 10.1091 37.5963C10.6167 37.7322 11.146 37.7667 11.6669 37.698C12.1469 37.634 12.6329 37.438 13.3049 37.082C13.786 36.8194 14.3259 36.6831 14.874 36.6859C15.4221 36.6887 15.9605 36.8305 16.4389 37.098C17.4049 37.658 17.9789 38.688 18.0189 39.804C18.0469 40.564 18.1189 41.084 18.3049 41.53C18.5059 42.0156 18.8007 42.4569 19.1723 42.8286C19.544 43.2002 19.9853 43.495 20.4709 43.696C21.2049 44 22.1369 44 24.0009 44C25.8649 44 26.7969 44 27.5309 43.696C28.0165 43.495 28.4578 43.2002 28.8295 42.8286C29.2011 42.4569 29.4959 42.0156 29.6969 41.53C29.8809 41.084 29.9549 40.564 29.9829 39.804C30.0229 38.688 30.5969 37.656 31.5629 37.098C32.0413 36.8305 32.5797 36.6887 33.1278 36.6859C33.6759 36.6831 34.2158 36.8194 34.6969 37.082C35.3689 37.438 35.8549 37.634 36.3349 37.698C36.8558 37.7667 37.3851 37.7322 37.8927 37.5963C38.4002 37.4604 38.876 37.2258 39.2929 36.906C39.9229 36.422 40.3889 35.614 41.3209 34C42.2529 32.386 42.7209 31.58 42.8229 30.79C42.8916 30.2691 42.8571 29.7398 42.7212 29.2322C42.5853 28.7247 42.3507 28.2489 42.0309 27.832C41.7349 27.448 41.3209 27.126 40.6789 26.722C40.2108 26.4368 39.8226 26.0375 39.5508 25.5614C39.2791 25.0854 39.1325 24.5481 39.1249 24C39.1249 22.884 39.7329 21.872 40.6789 21.28C41.3209 20.874 41.7369 20.552 42.0309 20.168C42.3507 19.7511 42.5853 19.2753 42.7212 18.7678C42.8571 18.2602 42.8916 17.7309 42.8229 17.21C42.7189 16.422 42.2529 15.614 41.3229 14C40.3889 12.386 39.9229 11.58 39.2929 11.094C38.876 10.7742 38.4002 10.5396 37.8927 10.4037C37.3851 10.2678 36.8558 10.2333 36.3349 10.302C35.8549 10.366 35.3689 10.562 34.6949 10.918C34.2141 11.1803 33.6746 11.3164 33.1268 11.3136C32.5791 11.3108 32.041 11.1692 31.5629 10.902C31.0922 10.6214 30.7003 10.226 30.424 9.75271C30.1477 9.27946 29.9959 8.74386 29.9829 8.196C29.9549 7.436 29.8829 6.916 29.6969 6.47C29.4959 5.98436 29.2011 5.5431 28.8295 5.17145C28.4578 4.79979 28.0165 4.50503 27.5309 4.304Z"
                                        stroke="#053862" stroke-width="3" />
                                </svg>
                            </div>
                            <h5>Personal eco-system</h5>
                            <p>Build your brand and manage your profile and inquiries with ease. Connect with your
                                audience
                                effortlessly.</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 d-flex">
                        <div class="fly-feature-card w-100">
                            <div class="fly-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6 12V44H42V48H6C4.93913 48 3.92172 47.5786 3.17157 46.8284C2.42143 46.0783 2 45.0609 2 44V12H6ZM32 18H43L32 7V18ZM14 4H34L46 16V36C46 37.0609 45.5786 38.0783 44.8284 38.8284C44.0783 39.5786 43.0609 40 42 40H14C12.9391 40 11.9217 39.5786 11.1716 38.8284C10.4214 38.0783 10 37.0609 10 36V8C10 6.93913 10.4214 5.92172 11.1716 5.17157C11.9217 4.42143 12.9391 4 14 4ZM14 8V36H42V22H28V8H14Z"
                                        fill="#053862" />
                                </svg>
                            </div>
                            <h5>Step-by-step guidance</h5>
                            <p>Learn to navigate our platform, access best practices, and enjoy exclusive member
                                services.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 d-flex">
                        <div class="fly-feature-card w-100">
                            <div class="fly-icon">
                                <svg width="49" height="48" viewBox="0 0 49 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M23.0845 6.616C22.2965 7.644 21.4085 9.232 20.1165 11.548L19.4625 12.722L19.3445 12.934C18.7445 14.014 18.2345 14.93 17.4165 15.55C16.5905 16.178 15.5825 16.404 14.4105 16.668L14.1825 16.72L12.9105 17.008C10.4005 17.576 8.69046 17.966 7.52246 18.428C6.38046 18.876 6.14046 19.246 6.04846 19.54C5.95046 19.852 5.94846 20.33 6.62846 21.414C7.32246 22.514 8.49246 23.886 10.2005 25.886L11.0685 26.9L11.2185 27.074C12.0245 28.014 12.6965 28.798 13.0045 29.79C13.3105 30.776 13.2085 31.81 13.0845 33.066L13.0645 33.3L12.9325 34.654C12.6725 37.318 12.5005 39.154 12.5585 40.474C12.6185 41.794 12.8965 42.158 13.1185 42.326C13.3145 42.476 13.6785 42.64 14.8645 42.3C16.0705 41.956 17.6745 41.222 20.0245 40.14L21.2165 39.592L21.4345 39.492C22.5245 38.986 23.4685 38.55 24.5005 38.55C25.5325 38.55 26.4765 38.986 27.5665 39.49C27.6371 39.5247 27.7105 39.558 27.7865 39.59L28.9765 40.14C31.3265 41.222 32.9305 41.956 34.1365 42.3C35.3225 42.64 35.6865 42.476 35.8825 42.326C36.1045 42.158 36.3825 41.792 36.4425 40.474C36.5025 39.154 36.3265 37.318 36.0685 34.654L35.9365 33.3L35.9165 33.066C35.7925 31.81 35.6905 30.776 35.9965 29.79C36.3045 28.798 36.9765 28.014 37.7825 27.074L37.9325 26.9L38.8005 25.886C40.5085 23.886 41.6785 22.514 42.3705 21.414C43.0525 20.33 43.0505 19.854 42.9525 19.54C42.8605 19.246 42.6205 18.876 41.4785 18.428C40.3085 17.966 38.6005 17.576 36.0905 17.008L34.8185 16.72L34.5905 16.668C33.4185 16.404 32.4105 16.178 31.5845 15.55C30.7645 14.93 30.2585 14.016 29.6565 12.934L29.5405 12.722L28.8845 11.548C27.5925 9.232 26.7045 7.644 25.9165 6.616C25.1285 5.588 24.7285 5.5 24.5005 5.5C24.2725 5.5 23.8705 5.588 23.0845 6.616ZM20.7045 4.792C21.6545 3.548 22.8325 2.5 24.5005 2.5C26.1685 2.5 27.3445 3.548 28.2985 4.792C29.2345 6.016 30.2285 7.798 31.4425 9.976L32.1605 11.262C32.9445 12.67 33.1465 12.97 33.3985 13.162C33.6385 13.344 33.9525 13.448 35.4785 13.794L36.8785 14.11C39.2305 14.642 41.1685 15.08 42.5785 15.636C44.0425 16.214 45.3245 17.064 45.8185 18.65C46.3065 20.22 45.7585 21.664 44.9105 23.01C44.0865 24.32 42.7705 25.86 41.1625 27.74L40.2125 28.85C39.1785 30.058 38.9625 30.354 38.8605 30.68C38.7585 31.014 38.7665 31.4 38.9245 33.01L39.0665 34.486C39.3105 36.998 39.5085 39.046 39.4385 40.606C39.3685 42.196 39.0085 43.72 37.6985 44.716C36.3625 45.728 34.8085 45.616 33.3085 45.184C31.8545 44.768 30.0425 43.934 27.8425 42.92L26.5305 42.316C25.0945 41.656 24.7885 41.55 24.5005 41.55C24.2125 41.55 23.9065 41.656 22.4705 42.316L21.1605 42.92C18.9585 43.934 17.1465 44.768 15.6925 45.184C14.1925 45.614 12.6385 45.728 11.3045 44.716C9.99246 43.72 9.63246 42.196 9.56246 40.608C9.49246 39.048 9.69046 36.998 9.93446 34.488L10.0785 33.01C10.2345 31.398 10.2425 31.014 10.1385 30.68C10.0385 30.354 9.82246 30.06 8.78846 28.85L7.83846 27.74C6.23246 25.86 4.91646 24.32 4.09246 23.012C3.24246 21.664 2.69446 20.22 3.18246 18.65C3.67646 17.064 4.95846 16.214 6.42246 15.636C7.83246 15.08 9.77046 14.642 12.1225 14.11L12.2485 14.082L13.5205 13.794C15.0485 13.448 15.3605 13.344 15.6025 13.16C15.8545 12.97 16.0565 12.67 16.8425 11.262L17.5585 9.976C18.7725 7.796 19.7665 6.016 20.7025 4.792"
                                        fill="#053862" />
                                </svg>

                            </div>
                            <h5>Reviews / trust widget</h5>
                            <p>Gain patient reviews with Bookimed to enhance your brand's trust and revenue. Leverage
                                these
                                insights.</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 d-flex">
                        <div class="fly-feature-card w-100">
                            <div class="fly-icon">
                                <svg width="34" height="44" viewBox="0 0 34 44" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17 2.25803L17.6471 0.744484C17.4426 0.656989 17.2224 0.611877 17 0.611877C16.7776 0.611877 16.5574 0.656989 16.3529 0.744484L17 2.25803ZM17 41.7419L16.184 43.1699C16.4325 43.3119 16.7138 43.3865 17 43.3865C17.2862 43.3865 17.5675 43.3119 17.816 43.1699L17 41.7419ZM16.3507 0.746678L2.32955 6.75481L3.61936 9.7819L17.6449 3.77158L16.3507 0.746678ZM0 10.2842V25.332H3.29032V10.2842H0ZM7.46026 38.1862L16.184 43.1699L17.816 40.3139L9.09226 35.328L7.46026 38.1862ZM17.816 43.1699L26.5397 38.1862L24.9077 35.328L16.184 40.3139L17.816 43.1699ZM34 25.3298V10.2864H30.7097V25.3342L34 25.3298ZM31.6748 6.757L17.6471 0.746678L16.3529 3.76939L30.3785 9.7819L31.6748 6.757ZM34 10.2864C34 8.75094 33.0853 7.36242 31.6748 6.757L30.3785 9.7819C30.477 9.82438 30.5608 9.89482 30.6197 9.9845C30.6786 10.0742 30.7099 10.1791 30.7097 10.2864H34ZM26.5397 38.1862C28.8058 36.8912 30.6894 35.0203 31.9995 32.7629C33.3096 30.5055 33.9998 27.942 34 25.332H30.7097C30.7092 27.3616 30.1724 29.3551 29.1535 31.1105C28.1346 32.8659 26.6699 34.3209 24.9077 35.328L26.5397 38.1862ZM0 25.332C0.000234205 27.942 0.690377 30.5055 2.0005 32.7629C3.31062 35.0203 5.19416 36.8912 7.46026 38.1862L9.09226 35.328C7.32975 34.3207 5.86483 32.8654 4.84593 31.1096C3.82703 29.3538 3.29037 27.3598 3.29032 25.3298L0 25.332ZM2.32516 6.75481C1.63509 7.05088 1.047 7.54284 0.633714 8.16979C0.220429 8.79673 9.81956e-05 9.53332 0 10.2842H3.29032C3.29032 10.0649 3.42194 9.86526 3.62374 9.77752L2.32516 6.75481Z"
                                        fill="#053862" />
                                    <path d="M23.5812 17.613L14.807 26.3872L10.4199 22.0001" stroke="#053862"
                                        stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <h5>Mobile application</h5>
                            <p>Attract patients and efficiently manage requests on the go. Stay updated with real-time
                                notifications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Steps & Pricing Section -->
        

        <!-- FAQ Section -->
        <section class="faq-section">
            <div class="container">
                <h2>Frequently Ask Questions</h2>
                <div class="accordion" id="faqAccordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header"><button class="accordion-button" type="button"
                                data-bs-toggle="collapse" data-bs-target="#faq-1">Online visibility</button></h2>
                        <div id="faq-1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">You'll get access to international patients flow from 210+
                                countries
                                with your personal profile.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header"><button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#faq-2">Telemedicine options</button></h2>
                        <div id="faq-2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">Details about telemedicine options.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header"><button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#faq-3">Patient reviews</button></h2>
                        <div id="faq-3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">Details about patient reviews.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header"><button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#faq-4">Analytics dashboard</button></h2>
                        <div id="faq-4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">Details about the analytics dashboard.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
