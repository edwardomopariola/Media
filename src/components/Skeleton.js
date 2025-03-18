import classNames from "classnames";

function Skeleton({ times, className  }) {  //The Skeleton component takes two props: times and className. 
// The times prop is the number of skeleton boxes to render, and the className prop is the class name to apply to the skeleton boxes.
// The Skeleton component uses the classNames library to conditionally apply classes based on the props passed to it.
const outerClassNames = classNames(  //The outerClassNames variable is a string of class names that are conditionally applied based on the props passed to the Skeleton component.
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    'mb-2.5',
    className
);
const innerClassNames = classNames(  //The innerClassNames variable is a string of class names that are conditionally applied based on the props passed to the Skeleton component.
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
);

    const boxes = Array(times)
        .fill(0)
        .map((_, index) => {
            return <div key={index} className={outerClassNames}>
                <div className="{innerClassNames}"/>
            </div>
        });

    return <div>{boxes}</div>;

}

export default Skeleton;