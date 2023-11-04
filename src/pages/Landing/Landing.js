import './Landing.scss';
import { BiLinkExternal } from "react-icons/bi";


const Landing = () => {
    return (
        <>
        <section className='landing'>
            <section className='landing__section landing__section--main'>
                <div className='landing__top'>
                    <h1 className='landing__title'>dojodream</h1>
                </div>
                <div className='landing__bottom'>
                <img alt='ninja' className='landing__image' src={require('../../assets/images/mainlogo.png')}/>
                        <h2 className='landing__heading landing__heading--main'> Find a dream dojo</h2>
                        <p className='landing__description'>Find martial arts gyms around you within one click. Learn about gym's senseis, schedule, membership cost and more...</p>
                        {/* <p className='landing__description'>Team of designers and engineers made it possible to compare local dojos and find the best martial arts environment near you.</p> */}
                        <a href="/main" target="_blank" className='landing__cta'>Try dojodream  <BiLinkExternal/></a>
                </div>
            </section>
            <section className='landing__section landing__section--mission'>
                <h2 className='landing__heading'>Our Mission</h2>
                <p className='landing__description'>We're the silent bridge, uniting ninjutsu seekers with enlightening dojos, helping warriors embrace their potential.</p>
                <p className='landing__description'>For dojo senseis, we provide tools to expand their reach and make a mark on the world.</p>
                <p className='landing__description'>Dojodream offers paths to martial enlightenment, combating bullying, and ensuring safety.</p>
                <p className='landing__description'>Give your descendants a worthy legacy, fortify the ninja clan, and join us in using martial arts for good. Walk this sacred journey with dojodream.</p>
            </section>
            <section className='landing__section'>
                <h2 className='landing__heading'>Testimonials</h2>
                <div className='landing__testimonial'>
                    <img alt='Matt Walsh' className=' landing__image landing__image--user' src={require('../../assets/images/mattwalsh.png')}/>
                    <h3 className='landing__subheading'>Matt Walsh</h3>
                    <h3 className='landing__substring'>Owner of 10th Planet Pompano</h3>
                    <p className='landing__description landing__description--centered'>With dojodream I have more local students coming to the gym every month.<br/>
                    Because of simple and transparent interface, they get all information they need to decide to try a class and later sign up for years of trainings.
                    </p>
                </div>
                <div className='landing__testimonial'>
                    <img alt='Matt Walsh' className=' landing__image landing__image--user' src={require('../../assets/images/ngannou.png')}/>
                    <h3 className='landing__subheading'>Francis Ngannou</h3>
                    <h3 className='landing__substring'>UFC Heavyweight Champion</h3>
                    <p className='landing__description landing__description--centered'>With dojodream I found a gym that made me a UFC champion.<br/>
                    Because of simple and transparent interface, I got all information I needed to decide to try a class and later sign up for years of trainings.
                    </p>
                </div>
            </section>
            <section className='landing__section landing__section--facts'>
                <h2 className='landing__heading'>dojo Facts</h2>
                <div className='landing__container'>
                    <div className='landing__fact '>
                        <div className='landing__heading-div'>
                            <h3 className='landing__subheading landing__subheading--fact'> 100%</h3>
                            <img alt='diamond' className='landing__icon' src={require('../../assets/images/diamond.png')}/>
                        </div>
                        <p className='landing__description landing__description--fact'><span className="landing__span">Free</span> to find gyms and new students</p>
                    </div>
                    <div className='landing__fact '>
                        <div className='landing__heading-div'>
                            <h3 className='landing__subheading landing__subheading--fact'> 23</h3>
                            <img alt='heart' className='landing__icon' src={require('../../assets/images/heart.png')}/>
                        </div>
                        <p className='landing__description landing__description--fact'><span className="landing__span">Martail arts gyms</span> are registered in the app</p>
                    </div>
                    <div className='landing__fact '>
                        <div className='landing__heading-div'>
                            <h3 className='landing__subheading landing__subheading--fact'>117</h3>
                            <img alt='star' className='landing__icon' src={require('../../assets/images/star.png')}/>
                        </div>
                        <p className='landing__description landing__description--fact'><span className="landing__span">Ninjas</span> interacted with local gyms via dojodream </p>
                    </div>
                </div>
            </section>
            <section className='landing__section landing__section--cta'>
                <h2 className='landing__heading landing__heading--main'> Get started</h2>
                <p className='landing__description'>Search for dojos in your local area. Contact the gym and start your journey in martial arts.<br/><br/>
                Find new students by registering your gym on the app. Support the community together with us!</p>
                <a href="/main" target="_blank" className='landing__cta'>Try dojodream <BiLinkExternal/></a>
            </section>
        </section>
        <footer className='landing__footer'>
        <div className='landing__footer-section landing__footer-section--icons'>
            <div className='landing__footer-icon-div'>
                <img className='landing__footer-icon' alt='insta' src={require('../../assets/images/insta.png')}/>
            </div>
            <div className='landing__footer-icon-div'>
                <img className='landing__footer-icon' alt='facebook' src={require('../../assets/images/facebook.png')}/>
            </div>
            <div className='landing__footer-icon-div'>
                <img className='landing__footer-icon' alt='linkedin' src={require('../../assets/images/linkedin.png')}/>
            </div>
            <div className='landing__footer-icon-div'>
                <img className='landing__footer-icon' alt='x' src={require('../../assets/images/x.com.png')}/>
            </div>
        </div>
        <div className='landing__footer-section landing__footer-section--bottom'>
            <img src={require('../../assets/images/codingdojo.png')} alt='logo' className='landing__image'/>
            <p className='landing__substring landing__substring--footer'><div className="landing__reserved">© 2008 - 2023 dojodream.<br/> All rights reserved.</div></p>
        </div>
    </footer>
    </>
        
    );
}

export default Landing;