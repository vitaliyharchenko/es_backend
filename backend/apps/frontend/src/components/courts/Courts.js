import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCourts } from "../../actions/courts";


export class Courts extends Component {
    static propTypes = {
        courts: PropTypes.array.isRequired,
        getCourts: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getCourts();
    };

    render() {
        return (
            <div style={{ paddingTop: 20 }}>
                <h1 style={styles.header}>Площадки</h1>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {this.props.courts.map(court => (
                                <div className="col-12 col-md-6 col-xl-4" key={court.id}>
                                    <div className="card" style={styles.card}>
                                        <img src="http://easysport.online/media/courts/18.jpg" alt="" className="card-img-top"/>
                                        <div className="card-body" style={styles.cardBody}>
                                            <p>
                                                { court.title }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    header: {
      fontWeight: 'bold'
    },
    card: {
        marginBottom: 20,
        borderRadius: 15
    },
    cardBody: {
        position: 'relative'
    }
};

// попадаем в games reducer и достаем games массив
const mapStateToProps = state => ({
    courts: state.courtsReducer.courts
});

export default connect(mapStateToProps, { getCourts })(Courts);