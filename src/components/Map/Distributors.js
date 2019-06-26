import React, { Component } from 'react';
import Select from 'react-select';
import Checkbox from 'react-mdc-web/lib/Checkbox/';
import { MapDiv, Description, Detail } from './DistributorStyled';
import data from '../../data/data.json';
import subD from '../../data/subd.json';

class Distributors extends Component {
  constructor() {
    super();
    this.state = {
      google: window.google,
      map: '',
      center: { lat: 28.3949, lng: 84.124 },
      infowindow: new window.google.maps.InfoWindow(),
      subDMarkers: [],
      outletMarkers: [],
      count: data.length.toLocaleString('en'),
      distributors: [],
      selectedOption: null,
      totalCount: data.length.toLocaleString('en'),
      distributorData: subD,
      outletData: data,
      checked: false,
    };
  }

  componentDidMount() {
    const center = { lat: 28.3949, lng: 84.124 };
    const map = new this.state.google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 7.5,
      styles: [],
    });
    this.subDmarker(map);
    // this.outletMarker(map);
    this.setState({ map, distributors: this.getDistributors() });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.outletData !== this.state.outletData) {
      if (this.state.checked) {
        this.clearMarkers(this.state.outletMarkers);
        this.outletMarker(this.state.map);
      }
      this.subDmarker(this.state.map);
    }
  };

  getDistributors = () => {
    const distributorId = [...new Set(subD.map(dist => dist.distributorId))];
    const distributor = [...new Set(subD.map(dist => dist.distributor))];

    const distributors = distributor.map((d, i) => ({
      value: distributorId[i],
      label: d,
    }));
    return distributors;
  };

  clearMarkers = (markers) => {
    if (markers.length !== 0) {
      markers.forEach((d, i) => {
        markers[i].setMap(null);
      });
    }
  };

  subDmarker = (map) => {
    const {
      subDMarkers, infowindow, google, distributorData,
    } = this.state;
    this.clearMarkers(subDMarkers);
    distributorData.forEach((element) => {
      const marker = new google.maps.Marker({
        position: { lat: parseFloat(element.lat), lng: parseFloat(element.long) },
        map,
        icon: `${process.env.PUBLIC_URL}/icons/ic_geolocation_blue.svg`,
        class: 'hello',
      });
      marker.addListener('click', () => {
        infowindow.close();
        infowindow.setContent(`<h3>${element.distributor}</h3>`);
        infowindow.open(map, marker);
      });
      subDMarkers.push(marker);
    });
  };

  outletMarker = (map) => {
    const {
      outletMarkers, infowindow, google, outletData,
    } = this.state;
    this.clearMarkers(outletMarkers);
    outletData.forEach((element) => {
      const marker = new google.maps.Marker({
        position: { lat: parseFloat(element.lat), lng: parseFloat(element.long) },
        map,
        icon: `${process.env.PUBLIC_URL}/icons/ic_geolocation_red.svg`,
        class: 'hello',
      });
      marker.addListener('click', () => {
        infowindow.close();
        infowindow.setContent(
          `<div><h3>${element.outletTitle}</h3><hr/>${element.distributor}</div>`,
        );
        infowindow.open(map, marker);
      });
      outletMarkers.push(marker);
    });
  };

  reset = () => {
    this.clearMarkers(this.state.subDMarkers);
    const { map, center, totalCount } = this.state;
    map.panTo(center);
    map.setZoom(7.5);
    this.setState({
      distributorData: subD,
      outletData: [],
      count: totalCount,
      selectedOption: '',
      checked: false,
    });
    this.clearMarkers(this.state.outletMarkers);
  };

  handleChange = (selectedOption) => {
    if (selectedOption) {
      console.log(selectedOption.value);
      const distributorData = subD.filter(d => d.distributorId === selectedOption.value);
      const outletData = data.filter(d => d.distributorId === selectedOption.value);
      const { map } = this.state;
      map.panTo({
        lat: parseFloat(distributorData[0].lat),
        lng: parseFloat(distributorData[0].long),
      });
      map.setZoom(12);
      this.setState({
        selectedOption,
        distributorData,
        outletData,
        count: outletData.length.toLocaleString('en'),
      });
    }
  };

  checkBoxChange = (e) => {
    const { selectedOption, map, outletMarkers } = this.state;
    if (selectedOption.value) {
      this.setState({
        checked: e.target.checked,
      });
    }
    if (e.target.checked) {
      this.outletMarker(map);
    } else {
      this.clearMarkers(outletMarkers);
    }
  };

  render() {
    const { count, distributors, selectedOption } = this.state;
    return (
      <MapDiv>
        <Description>
          <Select
            options={distributors}
            value={selectedOption}
            defaultValue="Select Distributors"
            onChange={this.handleChange}
            placeholder="Select Distributor"
          />
          <Detail>
            <div className="counts">
              <h1 id="count">
                {count.toLocaleString('en')}
                {' '}
              </h1>
              <span>Total no. of Outlets</span>
            </div>
            <div className="show-hide">
              <hr />
              <Checkbox
                onChange={this.checkBoxChange}
                disabled={!this.state.selectedOption}
                checked={this.state.checked}
              />
              <div className="show-outlets">Show Outlets</div>
              <div className="reset">
                <img
                  src={`${process.env.PUBLIC_URL}/icons/reload.png`}
                  onClick={() => {
                    this.reset();
                  }}
                />
              </div>
            </div>
          </Detail>
        </Description>
        <div id="map" />
      </MapDiv>
    );
  }
}

export default Distributors;
