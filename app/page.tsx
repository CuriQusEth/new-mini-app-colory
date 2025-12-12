"use client";
import { useState, useEffect } from "react";
import { useQuickAuth, useMiniKit } from "@coinbase/onchainkit/minikit";
import { useRouter } from "next/navigation";
import { sdk } from "@farcaster/miniapp-sdk";
import { minikitConfig } from "../minikit.config";
import styles from "./page.module.css";

interface AuthResponse {
  success: boolean;
  user?: {
    fid: number;
    issuedAt?: number;
    expiresAt?: number;
  };
  message?: string;
}

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Initialize MiniKit frame once
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  // Trigger sdk.ready() once everything is loaded
  useEffect(() => {
    if (!isFrameReady) return;

    const init = async () => {
      try {
        await sdk.actions.ready();
        console.log("✅ App ready — splash screen hidden");
      } catch (err) {
        console.error("❌ Error calling ready:", err);
      }
    };

    init();
  }, [isFrameReady]);

  // QuickAuth to validate user identity
  const {
    data: authData,
    isLoading: isAuthLoading,
    error: authError,
  } = useQuickAuth<AuthResponse>("/api/auth", { method: "GET" });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isAuthLoading) {
      setError("Verifying your identity... please wait");
      return;
    }

    if (authError || !authData?.success) {
      setError("Please authenticate before joining the waitlist");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    console.log("📧 Email submitted:", email);
    console.log("👤 Authenticated user:", authData.user);

    router.push("/success");
  };

  const displayName = context?.user?.displayName || "Friend";

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} type="button">
        ✕
      </button>

      <div className={styles.content}>
        <div className={styles.waitlistForm}>
          <h1 className={styles.title}>
            Join {minikitConfig.miniapp.name.toUpperCase()}
          </h1>

          <p className={styles.subtitle}>
            Hey {displayName}, get early access and be the first to experience
            the future of crypto marketing strategy.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Your amazing email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.joinButton}>
              {isAuthLoading ? "Verifying..." : "JOIN WAITLIST"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
