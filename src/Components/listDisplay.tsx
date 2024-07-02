import { ListComponents } from "../types/types";

interface OutlinedListComponents {
    list: ListComponents[]
}

const ListDisplay = ({list}: OutlinedListComponents) => {
    return ( 
    <div>
        {list.map((element, index) => (
            <div
                className = {element.cssClass}
                key = {index}
                style = {{height : `${element.height}px`}}
                >
            </div>
        ))}
    </div> );
}
 
export default ListDisplay;