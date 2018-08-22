import React from 'react';

import CarouselOld from './carouselOld';

import './styles.css';

const Landing = () => (
  <div>
    <CarouselOld />

    <div className="container marketing">
      <div className="row">
        <div className="col-lg-4">
          <img
            className="rounded-circle"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="Generic placeholder"
            width="140"
            height="140"
          />
          <h2>Heading</h2>
          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
          <p><a className="btn btn-secondary" href="# " role="button">View details &raquo;</a></p>
        </div>
        <div className="col-lg-4">
          <img
            className="rounded-circle"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="Generic placeholder"
            width="140"
            height="140"
          />
          <h2>Heading</h2>
          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
          <p><a className="btn btn-secondary" href="# " role="button">View details &raquo;</a></p>
        </div>
        <div className="col-lg-4">
          <img
            className="rounded-circle"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="Generic placeholder"
            width="140"
            height="140"
          />
          <h2>Heading</h2>
          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
          <p><a className="btn btn-secondary" href="# " role="button">View details &raquo;</a></p>
        </div>
      </div>

      <hr className="featurette-divider" />
      <div className="row featurette">
        <div className="col-md-7">
          <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It&apos;ll blow your mind.</span>
          </h2>
          <p className="lead">
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
        </div>
        <div className="col-md-5">
          <img
            className="featurette-image img-fluid mx-auto"
            data-src="holder.js/500x500/auto"
            alt="Generic placeholder"
          />
        </div>
      </div>

      <hr className="featurette-divider" />

      <div className="row featurette">
        <div className="col-md-7 order-md-2">
          <h2 className="featurette-heading">Oh yeah, it&apos;s that good. <span className="text-muted">See for yourself.</span>
          </h2>
          <p className="lead">
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
        </div>
        <div className="col-md-5 order-md-1">
          <img
            className="featurette-image img-fluid mx-auto"
            data-src="holder.js/500x500/auto"
            alt="Generic placeholder"
          />
        </div>
      </div>

      <hr className="featurette-divider" />

      <div className="row featurette">
        <div className="col-md-7">
          <h2 className="featurette-heading">And lastly, this one.
            <span className="text-muted">Checkmate.</span>
          </h2>
          <p className="lead">
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
        </div>
        <div className="col-md-5">
          <img
            className="featurette-image img-fluid mx-auto"
            data-src="holder.js/500x500/auto"
            alt="Generic placeholder"
          />
        </div>
      </div>

    </div>

  </div>
);

export default Landing;
