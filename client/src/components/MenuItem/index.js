import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function MenuItem({ children, content, placement, isPc }) {
    if (isPc) {
        return (
            <Tippy content={content} placement={placement}>
                {children}
            </Tippy>
        );
    }
    return children;
}

export default MenuItem;
