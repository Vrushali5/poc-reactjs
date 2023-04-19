import { ProgressSpinner } from 'primereact/progressspinner';

const DisplaySpinner = () => {
 return (
    <>
    <span>Spinner</span>
     <div style={{ background: "white", padding: '2rem', borderRadius: '10px', marginBottom: '1rem'}}>
              <ProgressSpinner style={{width: '100px', height: '100px', display: 'flex', justifyContent: 'center'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
      </div>
    </>
 )
 
}

export default DisplaySpinner;