import React from "react";

export default function Date({ dateString }) {
    return <time dateTime={dateString}> {dateString}</time>;
}
