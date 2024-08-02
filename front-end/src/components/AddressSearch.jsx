import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const AddressSearch = ({ onAddressSelect }) => {
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? ', ' : '') + data.buildingName;
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        onAddressSelect(fullAddress);
    };

    return <DaumPostcode onComplete={handleComplete} />;
};

export default AddressSearch;
