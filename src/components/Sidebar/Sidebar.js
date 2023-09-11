import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SidebarButton } from "./SidebarButton";
import logo from "../../image/logo.svg";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";

export const Sidebar = ({ className }) => {
  const location = useLocation();
  const isMethodActive = location.pathname === "/editor/method";
  const isActionActive = location.pathname === "/editor/action";
  const isVariableActive = location.pathname === "/editor/variable";
  const navigate = useNavigate();
  return (
    <>
      <div className={className}>
        {/* <SidebarButton /> */}
        <div onClick={() => navigate("/")} className="sidebar__header">
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
          <a
            data-tooltip-id={`my-tooltip-inline`}
            data-tooltip-content={`Coming soon`}
          >
            <div
              disabled={true}
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
              >
                Actions
              </NavLink>
            </div>
          </a>
          <a
            data-tooltip-id={`my-tooltip-inline`}
            data-tooltip-content={`Coming soon`}
          >
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
               
              >
                Variables
              </NavLink>
            </div>
          </a>
        </div>
      </div>
      <Tooltip
        id={`my-tooltip-inline`}
        style={{
          backgroundColor: "#F1F5F9",
          color: "#475569",
        }}
        noArrow={true}
        opacity={1}
      />
    </>
  );
};
