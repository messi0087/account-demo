<<<<<<< HEAD
import React from 'react';

const AccountBox =({text,type ,account})=>{
    return(
        <div className='col'>
            <div className="card">
                <div className={`card-header bg-${type} text-white`}>
                    {text}
                </div>
                <div className="card-body">
                    {account}
                </div>
            </div>
        </div>
    )
};

=======
import React from 'react';

const AccountBox =({text,type ,account})=>{
    return(
        <div className='col'>
            <div className="card">
                <div className={`card-header bg-${type} text-white`}>
                    {text}
                </div>
                <div className="card-body">
                    {account}
                </div>
            </div>
        </div>
    )
};

>>>>>>> origin/master
export default AccountBox;