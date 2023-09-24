import React from 'react';
import Cards from './components/Cards/Cards';
import Filters from './components/Filters/Filters';
import Map from './components/Map/Map';
const App = () => {
    return (
        <>
            {/* <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> */}
            <div>
                <div style={{ backgroundColor:'red' }}>
                    <Filters/>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '30% 70%', gap: '16px' }}>
                    <div style={{ padding: '16px', backgroundColor:'blue' }}>
                        <Cards />
                    </div>
                    <div style={{ padding: '16px' }}>
                        <Map />
                    </div>
                </div>
            </div>
        </>
    );
}
export default App;