// Style Sheet Import
import "./RelaySidebar.css";

// Component Imports
import ConversationList from "../conversations/ConversationList";

// Auth Context Imports
import { useAuth } from "../../context/AuthContext";

// Type Imports
import type {
    Conversation,
    ChatUser
} from "../../types/chat";

import {
    useEffect,
    useState,
} from "react";

import {
    searchUsers,
    createDirectConversation,
} from "../../api/chat_service";




type RelaySidebarProps = {
    selectedConversation:
        Conversation | null;

    onSelectConversation: (
        conversation: Conversation,
    ) => void;

    conversations:
        Conversation[];

    setConversations:
        React.Dispatch<
            React.SetStateAction<
                Conversation[]
            >
        >;

    isLoadingConversations:
        boolean;

    conversationError:
        string | null;
};


function RelaySidebar({
    selectedConversation,
    onSelectConversation,
    conversations,
    setConversations,
    isLoadingConversations,
    conversationError,
}: RelaySidebarProps) {

    const { currentUser, logout } = useAuth();

    const displayName =
        currentUser?.first_name ||
        currentUser?.username ||
        "User";

    const initial =
        displayName
            .charAt(0)
            .toUpperCase();

    const [
        showUserSearch,
        setShowUserSearch,
    ] = useState(false);

    const [
        userSearch,
        setUserSearch,
    ] = useState("");

    const [
        userSearchResults,
        setUserSearchResults,
    ] = useState<ChatUser[]>([]);

    const [
        isSearchingUsers,
        setIsSearchingUsers,
    ] = useState(false);

    useEffect(() => {
        const search = userSearch.trim();

        if (!showUserSearch || search.length < 2) {
            setUserSearchResults([]);
            return;
        }

        const timeout = window.setTimeout(
            async () => {
                try {
                    setIsSearchingUsers(true);

                    const users =
                        await searchUsers(search);

                    setUserSearchResults(users);
                } catch (error) {
                    console.error(error);
                    setUserSearchResults([]);
                } finally {
                    setIsSearchingUsers(false);
                }
            },
            300,
        );

        return () => {
            clearTimeout(timeout);
        };
    }, [userSearch, showUserSearch]);



    async function handleStartConversation(
        userId: number,
    ) {
        try {
            const conversation = await createDirectConversation(userId);

            setConversations((current) => {
                    const alreadyExists =
                        current.some(
                            (item) =>
                                item.id === conversation.id
                        );

                    if (alreadyExists) {
                        return current;
                    }

                    return [
                        conversation,
                        ...current,
                    ];
                });    

            onSelectConversation(
                conversation
            );

            setShowUserSearch(false);
            setUserSearch("");
            setUserSearchResults([]);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <aside className="RelaySidebar">

            <div className="RelaySidebarHeader">
                <div className="RelayBrand">
                    <div className="RelayBrandIcon">
                        R
                    </div>

                    <span className="RelayBrandName">
                        Relay
                    </span>
                </div>
            </div>

            <div className="RelaySidebarActions">

                <button
                    className="RelaySearchButton"
                    type="button"
                >
                    <span>Search conversations</span>
                    <span>⌘ K</span>
                </button>

                <button
                    className="RelayNewChatButton"
                    type="button"
                    onClick={() =>
                        setShowUserSearch(
                            (current) => !current
                        )
                    }
                >
                    + New conversation
                </button>

                {showUserSearch && (
                    <div className="RelayUserSearch">
                        <input
                            type="text"
                            value={userSearch}
                            placeholder="Search users..."
                            onChange={(event) =>
                                setUserSearch(
                                    event.target.value
                                )
                            }
                        />

                        {isSearchingUsers && (
                            <div>
                                Searching...
                            </div>
                        )}

                        {userSearchResults.map((user) => {
                            const displayName =
                                user.first_name || user.last_name
                                    ? [
                                        user.first_name,
                                        user.last_name,
                                    ]
                                        .filter(Boolean)
                                        .join(" ")
                                    : user.username;

                            const initial =
                                displayName
                                    .charAt(0)
                                    .toUpperCase();

                            return (
                                <button
                                    key={user.id}
                                    type="button"
                                    className="RelayUserSearchResult"
                                    onClick={() =>
                                        handleStartConversation(
                                            user.id
                                        )
                                    }
                                >
                                    <div className="RelayUserSearchAvatar">
                                        {initial}
                                    </div>

                                    <div className="RelayUserSearchInfo">
                                        <span className="RelayUserSearchName">
                                            {displayName}
                                        </span>

                                        <span className="RelayUserSearchUsername">
                                            @{user.username}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="RelayConversationSection">
                <p className="RelaySectionTitle">
                    Messages
                </p>

                <ConversationList
                    conversations={
                        conversations
                    }
                    selectedConversation={
                        selectedConversation
                    }
                    onSelectConversation={
                        onSelectConversation
                    }
                    isLoading={
                        isLoadingConversations
                    }
                    error={
                        conversationError
                    }
                />
            </div>

            <div className="RelayUserFooter">

                <div className="RelayAvatar">
                    {initial}

                    <span className="RelayPresenceDot" />
                </div>

                <div className="RelayUserInfo">
                    <span className="RelayUserName">
                        {displayName}
                    </span>

                    <span className="RelayUserStatus">
                        Online
                    </span>
                </div>

                <button
                    className="RelaySettingsButton"
                    type="button"
                    onClick={logout}
                    aria-label="Log out"
                    title="Log out"
                >
                    ↪
                </button>

            </div>

        </aside>
    );
}

export default RelaySidebar;