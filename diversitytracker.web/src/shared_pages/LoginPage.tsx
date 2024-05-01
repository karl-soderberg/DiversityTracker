import { Logout, StaticWebAuthLogins, useClientPrincipal } from '@aaronpowell/react-static-web-apps-auth';
import { CustomAnchor } from '../components/CustomAnchor'
import { ChartIcon } from '../resources/icons/ChartIcon'
import { FormIcon } from '../resources/icons/FormIcon'
import './LoginPage.css'
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const LoginPage = () => {
    
    return(
        <article className="Mainpage-login">
          <img src="https://res.cloudinary.com/dlw9fdrql/image/upload/v1714415047/office_tracker_logo_konca1.png" alt="" />
          <h2>OFFICE TRACKER</h2>
          <p>HARMONIZING THE INTEPERSONAL WORKSPACE</p>
          <section className="Mainpage-login__buttons">
              <StaticWebAuthLogins
                  twitter={false}
                  customRenderer={({ href, className, name }) => (
                    <Button className="login-button">
                      <a href={href} className={className}>
                        Login With {name}
                      </a>
                    </Button>
                  )}
                />
          </section>
        </article>
    )
}