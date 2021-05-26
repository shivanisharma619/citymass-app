import React from 'react';
import './AccessibilityPage.scss';


export function AccessibilityPage({
	url,
	accessResult,
}) {

	const { data } = accessResult;
	const { results } = data;
	let count = 0;
	const errorList = results.error_categories.map((accessError, index) => {
		count = count + accessError.occurance;
  	return(
      <React.Fragment key={index}>
        <div className="square">{accessError.occurance}</div>
        <span className="accessError">{accessError.element}</span>
        <hr className="solid" />
      </React.Fragment>
  	)
	});

  return (
	<div className="card bg-light text-black">
	  <img className="card-img" src="https://homepages.cae.wisc.edu/~ece533/images/watch.png" alt="Card image" />
	  <div className="card-img-overlay">
	    <h5 className="card-title text-center">Accessibility Inspector</h5>
	    <p className="text-center"><strong>{url}</strong></p>
      <div className="widget-heading font-weight-bold text-center pt-2 pb-2">
        {count} Accessibility Violation Detected
      </div>
	    <p className="card-text result">{results.description}</p>
	    <hr className="solid" />
	    {errorList}
	    <hr className="solid" />
	    <div className="footer text-center">
	    <span>Terms of Use</span>
	    <span>Privacy Policy</span>
	    <span>Cookie policy</span>
	    <br />
	    <span>Font Licence</span>
	    <span>Accessibility Statement</span>
	    </div>
	  </div>
	</div> 
  )
}