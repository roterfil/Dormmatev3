<script>
    import { useNavigate } from 'svelte-navigator';
  
    const navigate = useNavigate();
    
  </script>
  
<div class="welcome-container">
  <div class="content-wrapper">
      <h1 class="welcome-title">Welcome to&nbsp;<span class="highlight">Dorm</span>Mate!
      </h1>
    <p class="intro-text">
      <span style="font-weight: bold;">DormMate</span>
      <span>is a modern solution for dormitory and apartment living, designed to simplify life for both tenants and owners.</span>
    </p>

    <section class="about-section">
      <div class="about-content">
        <div class="image-column">
          <img src="https://placehold.co/600x400/e6f7f8/e6f7f8" alt="About DormMate" class="about-image">
        </div>
        <div class="text-column">
          <div class="about-text-wrapper">
            <h2 class="about-heading">About Us</h2>
            <p class="about-description">
              <span style="font-weight: bold;">DormMate</span>provides a streamlined digital platform that fosters efficiency and convenience. Whether you're a tenant seeking updates or an owner managing tasks, DormMate ensures seamless interaction and hassle-free management in today's fast-paced urban environment.
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="horizontal-divider"></div>

    <hr class="divider">
    <h2 class="features-title">Features</h2>
    <p class="features-description">
      DormMate offers a range of features designed to enhance dormitory and apartment living. Stay informed with real-time announcements, easily track and manage payments, and report maintenance issues seamlessly through our user-friendly platform.
    </p>
    <div class="features-container">
      <div class="feature-card" tabindex="0" role="button">Unit Management</div>
      <div class="feature-card" tabindex="0" role="button">Payment Tracking</div>
      <div class="feature-card" tabindex="0" role="button">Bulletin Board</div>
      <div class="feature-card" tabindex="0" role="button">Maintenance Request</div>
    </div>
  </div> 

</div>


<style>
  .welcome-container {
    display: flex;
    margin-top: 0;
    width: 885px;
    max-width: 100%;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }
  .content-wrapper {
    display: flex;
    margin-top: 4px;
    flex-direction: column;
  }
  .welcome-title {
    flex: 1;
    display: flex;
    align-items: start;
    gap: 0px;
    color: #262730;
    font: 700 40px/1.2 Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif;
  }
  .highlight {
    color: #20a7b5;
  }
  .intro-text {
    color: #000;
    align-self: start;
    margin-top: 0px;
    font: 300 16px Source Sans Pro, sans-serif;
  }
  .about-section {
    margin-top: 0px;
  }
  .about-content {
    gap: 20px;
    display: flex;
  }
  .image-column {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  .about-image {
    aspect-ratio: 0.96;
    object-fit: contain;
    width: 100%;
    flex-grow: 1;
  }
  .text-column {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: 20px;
  }
  .about-text-wrapper {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    font-family: Source Sans Pro, sans-serif;
    color: #000;
    margin: auto 0;
  }
  .about-heading {
    font-size: 20px;
    font-weight: 700;
    align-self: start;
    margin-left: 23px;
  }
  .about-description {
    border-radius: 20px;
    border: 1px solid #c0c0c0;
    display: flex;
    margin-top: 0px;
    padding: 28px 23px;
    flex-direction: column;
    overflow: hidden;
    font-size: 16px;
    font-weight: 300;
    justify-content: center;
  }

  .horizontal-divider {
    border: 1px solid #313132;
    margin: 15px 0 0;
  }

  .divider {
    border: 1px solid #313132;
    margin-top: 15px 0 0;

  }
  .features-title {
    flex: 1;
    margin-top: 35px;
    gap: 10px;
    color: #262730;
    font: 700 40px/1.2 Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif;
  }
  .features-description {
    color: #000;
    margin-top: 0px;
    font: 400 14px Source Sans Pro, sans-serif;
  }
  .features-container {
    display: grid;
    margin-top: 27px;
    gap: 20px;
    color: #000;
    grid-template-columns: repeat(2, 1fr); /* Two equal-width columns */
    font: 700 20px 'Source Sans Pro', sans-serif;
  }
  .feature-card {
    border-radius: 20px;
    border: 1px solid #c0c0c0;
    padding: 20px 26px;
    overflow: hidden;
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
  }


  @media (max-width: 991px) {
    .welcome-container {
      margin-right: 10px;
    }

    @media (max-width: 991px) {
    .horizontal-divider {
      max-width: 100%;
    }
  }
    .content-wrapper,
    .about-section,
    .welcome-title,
    .intro-text,
    .divider,
    .features-title,
    .features-description,
    .features-container {
      max-width: 100%;
    }
    .about-content {
      flex-direction: column;
      align-items: stretch;
    }
    .image-column,
    .text-column {
      width: 100%;
      margin-left: 0;
    }
    .text-column {
      margin-top: 20px;
    }
    .about-text-wrapper {
      margin-top: 40px;
    }
    .about-heading {
      margin-left: 10px;
    }
    .about-description {
      padding: 20px;
    }
    .features-title {
      margin-right: 2px;
      white-space: initial;
    }
    .features-description {
      margin-right: 2px;
    }
    .feature-card {
      padding: 20px;
      width: 100%;
    }

  }
</style>