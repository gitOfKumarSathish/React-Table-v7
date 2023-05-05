import { forwardRef, useRef, useEffect } from 'react';

function RowCheckBox() {
    return forwardRef(
        ({ indeterminate, ...rest }: any, ref) => {
            const defaultRef = useRef();
            const resolvedRef: any = ref || defaultRef;
            useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate;
            }, [resolvedRef, indeterminate]);

            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
            );
        }
    );
}

export default RowCheckBox;