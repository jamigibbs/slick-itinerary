import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { isProduction, setPageTitle } from '../../utils';
import ReactGA from 'react-ga';
import SiteFooter from '../SiteFooter';
import { Layout, Anchor, Typography, Divider, BackTop } from 'antd';
import './SupportGuide.css';

const { Content, Footer, Sider } = Layout;
const { Link } = Anchor;
const { Title, Text } = Typography;

if (isProduction) {
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const SupportGuide = (props) => {
  const [redirectHome, setRedirectHome] = useState(false);

  setPageTitle('Support Guide');

  function handleHomeClick(event){
    event.preventDefault();
    setRedirectHome(true);
  }

  if (redirectHome) {
    return <Redirect push to="/home" />;
  }
  
  return(
    <Layout>
    <BackTop />
    <Content style={{ padding: '20px 50px' }}>
      <a onclick={handleHomeClick} href="/">&larr; Go back home</a>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider 
          className="site-layout-background" >
          <Anchor>
            <Link href="#getting-started" title="Getting Started" className="parent-link">
              <Link href="#example-board" title="Example Board" />
              <Link href="#blank-board" title="Blank Board" />
              <Link href="#board-link" title="Find Your Board Link" />
            </Link>
            <Link href="#itinerary-options" title="Itinerary Options" className="parent-link">
              <Link href="#itinerary-color" title="Accent Color"/>
              <Link href="#itinerary-pdf" title="Download a PDF" />
              <Link href="#itinerary-email" title="Email Itinerary"/>
            </Link>
            <Link href="#feedback" title="Have Feedback?" className="parent-link"></Link>
          </Anchor>
        </Sider>
        <Content style={{ padding: '0 50px', minHeight: 280 }}>
          <Title level={3} id="getting-started">Getting Started</Title>

          <p>To help you get started quickly, we've created an sample Trello travel board for one of our favorite trips so that you can jump start your own travel itinerary.</p>

          <Title level={4} id="example-board">Using the Example Board</Title>

          <p>Make sure that you're logged into your <a href="https://trello.com/" title="Trello Home">Trello account</a> and navigate to our <a href="https://trello.com/b/aMsO3PuO" target="_blank" rel="noopener noreferrer">example board</a>. From here, click the <Text strong={true}>Show Menu</Text> button and select <Text strong={true}>More</Text>:</p>

          <img src="/guide/show-menu.png" width="400" alt="Trello board show menu button location" />

          <Divider />

          <img src="/guide/select-more.png" width="500" alt="Trello board menu More button" />

          <Divider />

          <p>Then select <Text strong={true}>Copy Board</Text>, make sure that the copied board is set to public, and that both board content options are selected:</p>

          <img src="/guide/copy-board-button.png" width="500" alt="Trello board copy button" />

          <Divider />

          <img src="/guide/copy-board-options.png" width="500" alt="Trello board copy board options" />

          <Divider />

          <Title level={4} id="blank-board">Using a Blank Board</Title>

          <p>Instead of copying the example board, you are also welcome to use your own existing board as well. If you do this, make sure to install the <a href="https://help.trello.com/article/1067-using-the-custom-fields-power-up" target="_blank" rel="noopener noreferrer">Custom Fields Power Up</a> with the following custom field names and types:</p>

          <ul>
            <li><strong>Name:</strong> Start Time <strong>Type:</strong> Date</li>
            <li><strong>Name:</strong> Address <strong>Type:</strong> Text</li>
            <li><strong>Name:</strong> Link <strong>Type:</strong> Text</li>
          </ul>

          <p>Without these fields, Slick Itinerary will not be able to display that information in your generated itinerary.</p>

          <Divider />

          <img src="/guide/custom-fields.png" width="500" alt="Trello board custom fields" />

          <Divider />

          <Title level={4} id="board-link">Find Your Board Link</Title>

          <p>Your board link is used to generate your itinerary. Copy your board link from either the browser address bar:</p>

          <img src="/guide/board-link-browser.png" width="600" alt="Trello board link location" />

          <Divider />

          <p>Or, navigate to your board settings and copy the link from there.<br />

          <Text strong={true}>Show Menu > More > Link to this board</Text>:</p>

          <Divider />

          <img src="/guide/board-link-settings.png" width="500" alt="Trello board link location" />

          <Divider />

          <p>Copy the board link and paste it into the Slick Itinerary input field to generate your itinerary automatically:</p>

          <img src="/guide/board-link-input.png" width="500" alt="Slick Itinerary input field for board link" />

          <Divider />

          <Title level={3} id="itinerary-options">Itinerary Options</Title>

          <p>The Slick Itinerary generated from your board has several options available.</p>

          <Title level={4} id="itinerary-color">Accent Color</Title>

          <p>You can select a custom accent color for your itinerary. This color will apply across various elements on the web and PDF versions of your itinerary:</p>

          <img src="/guide/accent-color.png" width="500" alt="Select an accent color" />

          <Divider />

          <Title level={4} id="itinerary-pdf">Download a PDF</Title>

          <p>To generate a PDF of your itinerary, click the PDF icon:</p>

          <img src="/guide/pdf-print-button.png" width="500" alt="PDF download or print button" />

          <Divider />

          <Title level={4} id="itinerary-email">Email Itinerary</Title>

          <p>By clicking the email icon, the system will automatically launch your default email client with your itinerary link in the email body. Make sure to update the email address to who you'd like to send the email to:</p>

          <img src="/guide/email-itinerary.png" width="600" alt="Email itinerary" />

          <Divider />

          <Title level={3} id="feedback">Have Feedback?</Title>

          <p>Thank you for using the site! If you have any questions or feedback, please reach out on Twitter <a href="https://twitter.com/SlickItinerary">@SlickItinerary</a></p>

        </Content>
      </Layout>
    </Content>
    <Footer style={{backgroundColor: '#333333'}}>
      <SiteFooter></SiteFooter>
    </Footer>
  </Layout>
  )
}

export default SupportGuide;