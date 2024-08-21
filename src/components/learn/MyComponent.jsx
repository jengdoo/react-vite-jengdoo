//component = html + css + js
import './style.css';
const MyComponent = ()=>{
    // const duy1 = "Duy";
    // const duy = [1,2,3];
    const duy = {
        name :"duy",
        age:20
    }
    return(
      <>
        <div>{duy.age} & learn to React</div>
        <div className="child" style={
            {border:"1px solid black"}
        }>Child</div>
      </>
    );
  }
  export default MyComponent;