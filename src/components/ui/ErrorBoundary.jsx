import { Component } from 'react';
import Button from './Button';

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <section role="alert" className="p-6">
      <h1 className="text-xl font-semibold">This page could not load</h1>
      <p className="my-4">Check your connection and reload to get the latest version.</p>
      <Button onClick={() => window.location.reload()}>Reload page</Button>
    </section>;
    return this.props.children;
  }
}
