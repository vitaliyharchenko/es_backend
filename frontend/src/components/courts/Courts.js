import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCourts } from "../../actions/courts";
import CourtCard from "./CourtCard";


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
                                <CourtCard court={court} key={court.id}/>
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
const mapStateToProps = (state) => ({
    courts: state.courtsReducer.courts
});

export default connect(mapStateToProps, { getCourts })(Courts);