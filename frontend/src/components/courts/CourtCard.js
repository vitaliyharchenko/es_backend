import React from "react";
import { Link } from 'react-router-dom';


function CourtCard({court}) {

    return (
        <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={court.id}>
            <div className="card" style={styles.card}>
                <img style={styles.image} src="http://easysport.online/media/courts/18.jpg" alt=""
                     className="card-img-top"/>
                <div className="card-body" style={styles.cardBody}>
                    <p style={styles.title}>
                        <Link to={`/courts/${court.id}`}>{court.title}</Link>
                    </p>
                    <p style={styles.address}>
                        {court.place.address}
                    </p>
                </div>
            </div>
        </div>
    );
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

export default CourtCard;