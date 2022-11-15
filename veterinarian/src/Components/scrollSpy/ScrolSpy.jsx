import { useSelector } from "react-redux"
import "./scrollspy.css"




const ScrollSpy = ({product, filterKey, addOverflow}) =>{

    
    // const filteredBids = (filterKey) => {
    //     return(
    //         bids.filter((val) => {
    //             if(filterKey === ""){
    //                 return val;
    //             }else if(val.productId.includes(filterKey)){
    //                 return val;
    //             }else return null
    //         })
    //         )
    //     }
        
    // const removePriceDuplicate = (filterKey) => {
    //     let bidsWithoutDup = []
    //     let isInclude = false
    //         filteredBids(filterKey).forEach((element) => {
    //             bidsWithoutDup.length === 0 && bidsWithoutDup.push(element)
    //             if (bidsWithoutDup.length !== 0){
    //                 bidsWithoutDup.forEach(newElement => {
    //                     if(newElement.price.includes(element.price)){
    //                         isInclude = true
    //                     }
    //                 })
    //                 !isInclude && bidsWithoutDup.push(element)  
    //                 isInclude = false
    //             }
    //         });
    //         return bidsWithoutDup
    // }
    // const removeDateDuplicate = (filterKey) => {
    //     let bidsWithoutDup = []
    //     let isInclude = false
    //         filteredBids(filterKey).forEach((element) => {
    //             bidsWithoutDup.length === 0 && bidsWithoutDup.push(element)
    //             if (bidsWithoutDup.length !== 0){
    //                 bidsWithoutDup.forEach(newElement => {
    //                      if(newElement.bidDate.includes(element.bidDate)){
    //                         isInclude = true
    //                     }
    //                 })
    //                 !isInclude && bidsWithoutDup.push(element)  
    //                 isInclude = false
    //             }
    //         });
    //         return bidsWithoutDup
    // }

    // let serial = filteredBids(filterKey).length + 1
    return( 
        <div className="">
            <div className="title-list-container px-3 pt-3" tabindex="0" >
                {/* <div className="hand-emoji-container">
                    <FontAwesomeIcon icon="fa-hand" />
                </div> */}
                <h2 className="text-start">All Bids</h2>
                {/* <p className="mb-0 ms-2">Total Bids: {filteredBids(filterKey).length}</p> */}
            </div>
            <div className="text-start bg-light top-list-container px-3" tabIndex="0" >
                <div className="row">
                
                    <div className="col">
                        <p className="m-0">Serial</p>
                    </div>     
                    <div className="col">
                        <p className="m-0">Name</p>
                    </div>        
                    <div className="col">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#Price" role="button" aria-expanded="false">Price</a>
                        <ul className={`dropdown-menu ${addOverflow}`}>
                        {/* {removePriceDuplicate(filterKey).reverse().map((bid, index) => {
                            return(
                                <li><a className="dropdown-item" href={"#" + bid.price}>{bid.price}$</a></li>
                            )}
                        )} */}
                        </ul>
                    </div>            
                    <div className="col">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">Bid date</a>
                        <ul className={`dropdown-menu ${addOverflow}`}>
                        {/* {removeDateDuplicate(filterKey).reverse().map((bid, index) => {
                            return(
                                <li><a className="dropdown-item" href={"#" + bid.bidDate}>{bid.bidDate}</a></li>
                            )}
                        )} */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-start list-container scrollspy-example bg-light px-3 mt-0" tabindex="0" >
                {/* {filteredBids(filterKey).reverse().map((bid, index) => {
                    serial -= 1
                    return(
                        <div className="row bid-details-container">
                            <div className="col">
                                <p className="bid-details">{serial}.</p>
                            </div>            
                            <div className="col">
                                <p className="bid-details">{bid.biderName}</p>
                            </div>            
                            <div className="col">
                                <p className="bid-details" id={bid.price}>{bid.price}$</p>
                            </div>            
                            <div className="col">
                                <p className="bid-details" id={bid.bidDate}>{bid.bidDate}</p>
                            </div>
                        </div>
                    )}
                )} */}
            </div>
        </div>
    )
}

export default ScrollSpy