import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { MenuTree } from "./TreeNode";
import PropTypes from "prop-types";

const data = [
    {
        id: 9,
        label: "menu.home",
        priority: 1,
        permissions: ["MANAGE_OWN_POSTS", "MANAGE_ALL_POSTS"],
        home: true,
        slug: "home",
        icon: "fa-home"
    },
    {
        id: 1,
        label: "menu.posts",
        priority: 1,
        permissions: [],
        home: true,
        icon: "fa-book",
        collapsed: true,
        children: [
            {
                id: 1,
                label: "menu.allPosts",
                priority: 1,
                permissions: [],
                slug: "posts",
                icon: "fa-envelope"
            },
            {
                id: 2,
                label: "menu.newPost",
                priority: 2,
                permissions: ["MANAGE_OWN_POSTS", "MANAGE_ALL_POSTS"],
                slug: "post-new",
                icon: "fa-plus"
            },
            {
                id: 3,
                label: "menu.tags",
                priority: 3,
                permissions: ["MANAGE_OWN_POSTS", "MANAGE_ALL_POSTS"],
                slug: "tags",
                icon: "fa-plus"
            },
            {
                id: 4,
                label: "menu.categories",
                priority: 4,
                permissions: ["MANAGE_OWN_POSTS", "MANAGE_ALL_POSTS"],
                slug: "categories",
                icon: "fa-plus"
            }
        ]
    },
    {
        id: 2,
        label: "menu.pages",
        priority: 2,
        permissions: [],
        icon: "fa-file",
        children: [
            {
                id: 1,
                label: "menu.allPages",
                priority: 1,
                permissions: [],
                slug: "pages",
                icon: "fa-envelope"
            },
            {
                id: 2,
                label: "menu.newPage",
                priority: 2,
                permissions: ["MANAGE_OWN_POSTS", "MANAGE_ALL_POSTS"],
                slug: "page-new",
                icon: "fa-plus"
            }
        ]
    },
    {
        id: 3,
        label: "menu.media",
        priority: 3,
        permissions: ["MANAGE_OWN_POSTS", "MANAGE_ALL_POSTS"],
        slug: "media",
        icon: "fa-picture-o"
    },
    {
        id: 4,
        label: "menu.settings",
        priority: 7,
        permissions: ["MANAGE_SETTINGS"],
        icon: "fa-cog",
        children: [
            {
                id: 1,
                label: "menu.menu",
                priority: 2,
                permissions: ["MANAGE_SETTINGS"],
                slug: "menu-builder",
                icon: "fa-bars"
            },
            {
                id: 2,
                label: "menu.siteSettings",
                priority: 1,
                permissions: ["MANAGE_SETTINGS"],
                slug: "settings",
                icon: "fa-user"
            }
        ]
    },

    {
        id: 6,
        label: "menu.profile",
        priority: 5,
        permissions: ["MANAGE_OWN_POSTS"],
        slug: "edit-profile",
        icon: "fa-user"
    },
    {
        id: 7,
        label: "menu.authors",
        priority: 6,
        permissions: ["MANAGE_USERS"],
        slug: "authors",
        icon: "fa-users"
    },
    {
        id: 8,
        label: "menu.themes",
        priority: 7,
        permissions: ["MANAGE_SETTINGS"],
        slug: "themes",
        icon: "fa-paint-brush"
    }
];
export default class Menu extends Component {
    static propTypes = {
        location: PropTypes.object,
        settings: PropTypes.object
    };
    constructor(props) {
        super(props);

        this.setData = this.setData.bind(this);
        this.navbarToggle = this.navbarToggle.bind(this);
        this.state = {
            navbarOpen: false,
            data
        };
        this.permissions = [];
    }

    componentWillMount() {
        if (typeof localStorage !== "undefined") {
            this.permissions = jwtDecode(localStorage.token).permissions;
        }
        this.setState({ data });
    }

    setData(newData) {
        this.setState({ data: newData });
    }
    toggleItem(item, e) {
        e.preventDefault();
        this.setState({
            [item]: !this.state[item]
        });
    }
    navbarToggle() {
        this.setState({ navbarOpen: !this.state.navbarOpen });
    }
    render() {
        const navbarStatus = this.state.navbarOpen ? "in" : "";

        const selected = this.props.location.pathname.replace("/admin/", "");

        return (
            <div className="sidebar distractor">
                <nav className="navbar navbar-custom">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle"
                            data-toggle="collapse"
                            onClick={this.navbarToggle}
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>

                        <Link className="navbar-brand brand" to="/">
                            {this.props.settings.site_title.value}
                            <small>
                                {this.props.settings.site_tagline.value}
                            </small>
                        </Link>
                    </div>

                    <div
                        className={`collapse navbar-collapse  ${navbarStatus}`}
                    >
                        <div id="menutree">
                            <MenuTree
                                data={this.state.data}
                                permissions={this.permissions}
                                route={selected}
                                setData={this.setData}
                            />
                        </div>
                    </div>
                </nav>

                <div className="copyright">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: this.props.settings.site_footer.value
                        }}
                    />
                </div>
            </div>
        );
    }
}
