import React from "react";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare state: State;
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  declare setState: React.Component<Props, State>["setState"];
  declare props: Props;

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("SafeGuard Error:", error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="bg-surface-container rounded-2xl p-8 max-w-md shadow-xl text-center border border-surface-variant/30">
            <h2 className="font-headline-md text-on-surface mb-2">
              Something went wrong
            </h2>
            <p className="font-label-md text-on-surface-variant mb-4">
              SafeGuard encountered an error. Try refreshing.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="bg-primary text-on-primary px-4 py-2 rounded-xl font-label-md hover:bg-primary-container transition-colors"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
