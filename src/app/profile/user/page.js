import React from 'react';

const Page = () => {
    return (
        <div>
            this is user page
            <form>
                <input type="file" accept="image/*"/>
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
};

export default Page;