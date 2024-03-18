// SPDX-License-Identifier:GPL-3.0
pragma solidity>=0.5.0<0.9.0;
contract AGRODECENTRAL{
struct new_offer_seller{
    string crop_type;
    uint quantity;
    uint expire_date;
    uint price_per_unit;
    uint total_price;
    address payable payment_address;
    bool deleivered;
}
mapping(uint=>new_offer_seller) public all_offers;


function create_offer(uint _id_to_buy,string memory _crop_type,uint _quantity,uint _expiry_date,uint _price_per_unit,address payable _payment_address) public payable{
    require(_quantity>0,"Quantity should be more than 1");
    require(_price_per_unit>0,"set price greater than 0");
    all_offers[_id_to_buy]=new_offer_seller(_crop_type,_quantity,_expiry_date,_price_per_unit,( _price_per_unit*_quantity),_payment_address,false);
    _id_to_buy++;
}

function purchase_crops(uint _id_to_buy ) public payable{

     new_offer_seller storage offer = all_offers[_id_to_buy];
        require(offer.expire_date < block.timestamp, "Offer has expired");
        require(offer.deleivered==false, "Offer has already been delivered");

        require(msg.value == offer.total_price, "Incorrect amount sent");

        // Lock the payment in the contract
        offer.payment_address.transfer(msg.value);

        // Set delivery status to true
        offer.deleivered = true;
}
}