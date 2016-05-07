import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, changingRoutes } from '../../redux/actions';
import CreateActivity from './CreateActivity';
import ActivityItem from './ActivityItem';
import ActivitiesList from './ActivitiesList';
import FlatButton from 'material-ui/FlatButton';

class ActivitiesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  openModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    const { activities } = this.props;
    var that = this;

    return (
      <div className="col-md-5">
        <FlatButton label="Create An Activity" onClick={this.openModal.bind(this)} />
        <CreateActivity modal={this.state.modalOpen} toggleModal={this.openModal.bind(this)}/>
        <ActivitiesList title="Activities">
          {activities.map(activity =>
            <ActivityItem
              // key={activity.lat}
              activity={activity}
              onAddToBuilderClicked={() => {
                this.props.addToBuilder(activity);
              }}/>
          )}
        </ActivitiesList>
      </div> 
    )
  }
}

ActivitiesContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired
  })).isRequired,
  addToBuilder: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    activities: state.activities,
    planBuilder: state.planBuilder
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder }
)(ActivitiesContainer)