import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

export const LabelForgot = ({ valueType, setValueType }: {valueType: string, setValueType: Function}) => {
    return (
        <div
            className={classNames(styles.foo, styles.pass, {
                [styles.hidden]: valueType === "forgot",
            })}
        >
            <div className={styles.paslink}>
                <label htmlFor="Password">Password</label>
                <p
                    className={classNames(styles.passButton, {
                        [styles.hidden]: valueType === "forgot",
                    })}
                    onClick={() => {
                        setValueType("forgot");
                    }}
                >
                    Forgot password?
                </p>
            </div>
        </div>
    );
};
