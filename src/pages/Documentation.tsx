import React, { useState, useEffect } from 'react';
import { Book, MessageSquare, Image, Brain, Shield, Terminal, Code, Zap, Settings, HelpCircle } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';

function Documentation() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-4xl font-orbitron font-bold mb-8">Documentation</h1>
      
      <div className="space-y-16 text-white/80">
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Book className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">Introduction</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">What is CYANIS?</h3>
              <p className="text-white/70">
                CYANIS is an advanced AI assistant designed to provide intelligent, human-like interactions. Whether you need help with research, coding, brainstorming, or casual conversation, CYANIS is built to assist you efficiently.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-5 h-5" />
                    <h4 className="font-medium">Conversational AI</h4>
                  </div>
                  <p className="text-white/60">Engages in natural, meaningful dialogue</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Image className="w-5 h-5" />
                    <h4 className="font-medium">Multimodal Processing</h4>
                  </div>
                  <p className="text-white/60">Understands and analyzes text, images, and code</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-5 h-5" />
                    <h4 className="font-medium">Personalization</h4>
                  </div>
                  <p className="text-white/60">Learns user preferences for a tailored experience</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5" />
                    <h4 className="font-medium">Security & Privacy</h4>
                  </div>
                  <p className="text-white/60">Built with data protection at its core</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Use Cases</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>Automating tasks and brainstorming ideas</li>
                <li>Generating creative content like stories and scripts</li>
                <li>Answering complex questions and retrieving relevant information</li>
                <li>Enhancing coding efficiency with AI-generated solutions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Terminal className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">Getting Started</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="font-semibold mb-2">Web Application</h3>
                <p className="text-white/60">Access CYANIS via the online interface</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="font-semibold mb-2">API</h3>
                <p className="text-white/60">Developers can integrate CYANIS into their apps</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="font-semibold mb-2">Chat Interface</h3>
                <p className="text-white/60">Interact seamlessly through supported platforms</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">User Guide</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Text Input</h4>
                  <p className="text-white/60">Simply type a question or command</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Image Input</h4>
                  <p className="text-white/60">Upload an image for analysis</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Code Assistance</h4>
                  <p className="text-white/60">Receive help with debugging and syntax suggestions</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>Use clear and concise prompts</li>
                <li>Provide context for more accurate responses</li>
                <li>Experiment with different phrasing for better results</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">Features & Capabilities</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                <h3 className="font-semibold mb-3">Conversational AI</h3>
                <p className="text-white/70">
                  CYANIS understands and responds to natural language with contextual awareness, making interactions feel seamless and intuitive.
                </p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                <h3 className="font-semibold mb-3">Multimodal Processing</h3>
                <p className="text-white/70">
                  CYANIS can process different types of input, including text, images, and code, offering comprehensive assistance across various domains.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Security & Privacy</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>Data encryption ensures safe interactions</li>
                <li>No personal data is stored or shared with third parties</li>
                <li>Users have control over their data and privacy settings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Code className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">API Documentation</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">API Overview</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>Authentication: Secure API key-based access</li>
                <li>Rate Limits: Usage caps to prevent overload</li>
                <li>Endpoints: Available API calls for text processing, image analysis, and more</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Example Requests & Responses</h3>
              <pre className="p-4 bg-white/5 rounded-lg border border-white/10 overflow-x-auto">
                <code className="text-white/70">{`{
  "query": "What is AI?",
  "response": "Artificial Intelligence (AI) is a field of computer science..."
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Error Handling</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>400 Bad Request: Invalid input format</li>
                <li>401 Unauthorized: Invalid API key</li>
                <li>500 Server Error: Temporary issues, retry request</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">Technical Details</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Underlying AI Model</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>Uses state-of-the-art deep learning and natural language processing (NLP)</li>
                <li>Continuously improves through updates and user feedback</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Data Handling & Privacy</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>Inputs are processed in real-time; no long-term data storage</li>
                <li>User interactions are anonymized and not used for targeted advertising</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Limitations & Known Issues</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>May generate incorrect or outdated information</li>
                <li>Struggles with extremely niche or ambiguous queries</li>
                <li>Does not provide real-time internet browsing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">FAQs & Support</h2>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-semibold mb-4">Common Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">How do I get started?</h4>
                  <p className="text-white/60">Start interacting with CYANIS directly through our web interface.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Is my data secure?</h4>
                  <p className="text-white/60">Yes, we use industry-standard encryption and security measures to protect your data.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">What if CYANIS isn't responding correctly?</h4>
                  <p className="text-white/60">Try rephrasing your query or providing more context for better results.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Support & Contact Info</h3>
              <p className="text-white/70">
                For technical support or general inquiries, please contact our support team at{' '}
                <a href="mailto:support@cyanis.xyz" className="text-white hover:text-white/80 transition-colors">
                  support@cyanis.xyz
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Documentation;