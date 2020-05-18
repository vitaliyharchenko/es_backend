import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
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
                                <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={court.id}>
                                    <div className="card" style={styles.card}>
                                        <img style={styles.image} src="http://easysport.online/media/courts/18.jpg" alt="" className="card-img-top"/>
                                        <div className="card-body" style={styles.cardBody}>
                                            <p style={styles.title}>
                                                { court.title }
                                            </p>
                                            <p style={styles.address}>
                                                { court.place.address }
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
        borderRadius: 15,
        overflow: "hidden"
    },
    cardBody: {
        position: 'relative'
    },
    image: {
    },
    title: {
        marginBottom: 0
    },
    address: {
        fontSize: 14,
        color: "#5b5b5b",
        marginBottom: 0
    }
};

// попадаем в games reducer и достаем games массив
const mapStateToProps = state => ({
    courts: state.courtsReducer.courts
});

export default connect(mapStateToProps, { getCourts })(Courts);