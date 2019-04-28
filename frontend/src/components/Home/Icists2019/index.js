import React, { Component } from 'react'
import topicimg from '../../../assets/img/topicimg.png'
import poster from '../../../assets/img/poster.png'

export class Icists2019 extends Component {
  render() {
    return (
      <div id="icists-2019">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <h2 className="text-uppercase font-weight-bold">About ICISTS 2019</h2>
            <img src={poster} className="poster" alt=""/>
            <h2 className="text-uppercase font-weight-bold">The Art of Science: Expression</h2>
            <img src={topicimg} alt=""/>
            <h3>The Sower, Millet(left), van Gogh(right)</h3>
            <div className="topic">
            <p>Vincent van Gogh is known for having redrawn Millet’s The Sower over 10 times throughout his short lifetime. Even though the same object was composed, he was able to convey a different emotion to the public at large by applying his own unique spin. Similar cases can be found in the field of science. Being expressed mainly through lab experiments and papers, science is usually considered difficult and distant. As van Gogh was able to recreate Millet’s work into something entirely different, depending on how it is expressed, science can be shown as much more approachable and entertaining. ICISTS 2019 aims to discuss the various ways of expressing science in a much more aesthetic and vibrant manner.</p>
            <p>Those who are introduced to science only through complex textbooks are bound to feel some degree of reluctance. To visually represent an abstract image in one’s imagination, a blank canvas is needed. Likewise, a different medium is required to convey professional scientific knowledge to the public. Every author, lecturer, creator and all those who engage in the popularization of science can provide a solution to this matter. Using their own language, these communicators bring about new interest and curiosity from people and contribute to the spreading of science culture.</p>
            <p>While science and art are both original fields built on creativity, they were seen as polar opposites. Nowadays, however, a fair number of scientists and artists are attempting at cooperation. Scientific phenomena captured by a microscope become artworks, and what used to be considered impossible structures can now be made thanks to technological advancements. Like colors on a palette mixing together to produce a new one, the amalgamation of science and art may give birth to something unique.</p>
            <p>ICISTS 2019 seeks to paint a new image for science by meeting those who express science beyond labs and papers. </p>
            </div>
          </div>
          <div className="col-auto"></div>
        </div>
      </div>
    )
  }
}

export default Icists2019
