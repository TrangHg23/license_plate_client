import { PropsWithChildren } from "react";
function DefaultLayout({children}: PropsWithChildren) {
    return (
        <div>
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
