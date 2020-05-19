import React from 'react';
import { connect } from 'react-redux';

import {getCourts} from "../../actions/courts";


export const Court = ({ court, getCourts }) => {
    if (court) {
        return (
            <div style={{paddingTop: 20}}>
                <h1 style={styles.header}>Площадка</h1>
                <hr/>
                <div className="row">
                    <div className="col-12 col-lg-4 pb-4">
                        <div className="card">
                            <img className="card-img-top"
                                 src="https://miro.medium.com/max/1400/1*cePnv6exBMPAxtJC0zySrA.png"
                                 alt="Court scene"/>
                            <div className="card-body">
                                <h5 className="card-title card-text">
                                    {court.title}
                                </h5>
                                <p className="card-text pt-4">
                                    <b>Адрес: </b>
                                    {court.place.address}
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Просмотров: 12</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        getCourts();
        return <p>No court</p>
    }
};

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

const getCourtById = (courts, courtId) => {
    const courtsFiltered = courts.filter(obj => {
        return obj.id === courtId
    });
    return courtsFiltered[0];
};

// попадаем в games reducer и достаем games массив
const mapStateToProps = (state, ownProps) => {
    const courtId = parseInt(ownProps.match.params.courtId, 10);
    return {
        court: getCourtById(state.courtsReducer.courts, courtId)
    }
};

export default connect(mapStateToProps, { getCourts })(Court);