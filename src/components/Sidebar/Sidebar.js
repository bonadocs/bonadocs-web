import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarButton } from "./SidebarButton";
import logo from "../../image/logo.svg";
import clsx from "clsx";

export const Sidebar = ({ className }) => {
  const location = useLocation();
  const isMethodActive = location.pathname === "/editor/method";
  const isActionActive = location.pathname === "/editor/action";
  const isVariableActive = location.pathname === "/editor/variable";

  return (
    <>
      <div className={className}>
        {/* <SidebarButton /> */}
        <div className="sidebar__header">
          <img className="sidebar__header__logo" src={logo} />
        </div>

        <div className="sidebar__options">
          <div
            className={
              isMethodActive
                ? "sidebar__options__active"
                : "sidebar__options__inactive"
            }
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sidebar__options__item"
                  : "sidebar__options__item__normal"
              }
              to="method"
            >
              Contracts
            </NavLink>
          </div>
          <div
            className={
              isActionActive
                ? "sidebar__options__active"
                : "sidebar__options__inactive"
            }
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sidebar__options__item"
                  : "sidebar__options__item__normal"
              }
              to="action"
            >
              Actions
            </NavLink>
          </div>
          <div
            className={
              isVariableActive
                ? "sidebar__options__active"
                : "sidebar__options__inactive"
            }
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sidebar__options__item"
                  : "sidebar__options__item__normal"
              }
              to="variable"
            >
              Variables
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
