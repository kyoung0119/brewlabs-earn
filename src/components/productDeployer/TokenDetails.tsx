import { useState, useEffect, ChangeEvent } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";

import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@components/ui/form";
import { Checkbox } from "components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem } from "@components/ui/accordion";
import ChainSelect from "views/swap/components/ChainSelect";

import { useActiveChainId } from "hooks/useActiveChainId";
import { tokenDeployerSchema, supportedNetworks } from "config/schemas/tokenDeployerSchema";
import {
  setTokenInfo,
  setDeployerTokenStep,
  setTokenImageDisplayUrl,
  useDeployerTokenState,
} from "state/deploy/deployerToken.store";

const TokenDetails = () => {
  const { chainId } = useActiveChainId();
  const [showConditionalField, setShowConditionalField] = useState([]);
  const [tokenImageDisplayUrl] = useDeployerTokenState("tokenImageDisplayUrl");
  const [
    {
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenTotalSupply,
      tokenImage,
      tokenDescription,
      tokenImmutable,
      tokenRevokeFreeze,
      tokenRevokeMint,
    },
  ] = useDeployerTokenState("tokenInfo");

  const form = useForm<z.infer<typeof tokenDeployerSchema>>({
    resolver: zodResolver(tokenDeployerSchema),
    defaultValues: {
      tokenDeployChainId: chainId,
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenTotalSupply,
      tokenImage,
      tokenDescription,
      tokenImmutable,
      tokenRevokeFreeze,
      tokenRevokeMint,
    },
  });

  const watchTokenDeployChainId = form.watch("tokenDeployChainId");

  const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();
    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  };

  const onSubmit = (data: z.infer<typeof tokenDeployerSchema>) => {
    // Store the form data in deployer store
    setTokenInfo(data);
    // Progress to the confirm step
    setDeployerTokenStep("confirm");
  };

  // By setting this state we can show/hide the conditional fields based on the pool type
  useEffect(() => {
    if (watchTokenDeployChainId === 900) {
      setShowConditionalField(["tokenImage", "tokenDescription"]);
    }
    if (watchTokenDeployChainId !== 900) {
      setShowConditionalField([]);
    }
  }, [watchTokenDeployChainId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <FormField
          control={form.control}
          name="tokenDeployChainId"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-xl">Choose a network to deploy on</FormLabel>
              <FormControl>
                <>
                  <ChainSelect id="chain-select" networks={supportedNetworks} />
                  <input type="hidden" {...field} value={chainId} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="divider" />

        <div className="my-8">
          <h4 className="mb-6 text-xl">Token details</h4>

          <div className="mb-4 grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="tokenName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token name</FormLabel>
                    <FormControl>
                      <Input placeholder="ie: Brewlabs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tokenSymbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="ie: BNB" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="tokenDecimals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token decimals</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tokenTotalSupply"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many tokens do you want to create?</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ie: 100 000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Accordion type="multiple" value={showConditionalField} className="w-full">
          <AccordionItem value="tokenImage" className="border-b-0">
            <AccordionContent>
              <FormField
                control={form.control}
                name="tokenImage"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem className="relative">
                    <FormLabel>Token icon</FormLabel>
                    <div className="absolute left-0 top-6">
                      <Avatar className="ring ring-zinc-900">
                        <AvatarImage src={tokenImageDisplayUrl} width={500} height={500} alt="Token image" />
                        <AvatarFallback>
                          <Upload className="h-auto w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <FormControl>
                      <Input
                        type="file"
                        className="pl-12"
                        {...rest}
                        onChange={(e) => {
                          const { files, displayUrl } = getImageData(e);
                          setTokenImageDisplayUrl(displayUrl);
                          onChange(files);
                        }}
                        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                      />
                    </FormControl>
                    <small className="text-gray-400">Recommended size: 500x500px</small>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tokenDescription" className="border-b-0">
            <AccordionContent>
              <FormField
                control={form.control}
                name="tokenDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="divider" />

        <h4 className="mb-6 text-xl">Advanced options</h4>

        <FormField
          control={form.control}
          name="tokenImmutable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Make contract immutable</FormLabel>
                <FormDescription>Secure your token contract so it cannot be changed later on.</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tokenRevokeFreeze"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Revoke freeze function</FormLabel>
                <FormDescription>
                  Required for decentralised exchanges and security for holders. If enabled, you can freeze holder
                  tokens.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tokenRevokeMint"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Revoke mint function</FormLabel>
                <FormDescription>Remove the ability to mint more tokens for your token contract.</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button variant="brand" type="submit" className="w-full">
          Confirm and finalise
        </Button>
      </form>
    </Form>
  );
};

export default TokenDetails;
