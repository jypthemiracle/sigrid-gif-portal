use anchor_lang::prelude::*;

declare_id!("F5BHW663mGz9yfJ6kGh5mqjmw866WunkaqrVYz95yaSK");

#[program]
pub mod myepicproject {
  use super::*;
  pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> Result<()> {
    // Get a reference to the account.
    let base_account = &mut ctx.accounts.base_account;
    // Initialize total_gifs.
    base_account.total_gifs = 0;
    Ok(())
  }

  // Hey, when someone calls add_gif be sure to attach the AddGif context to it
  // as well so the user can access the base_account and whatever else is attached to AddGif.
   pub fn add_gif(ctx: Context<AddGif>) -> Result<()> {
    // Get a reference to the account and increment total_gifs.
    let base_account = &mut ctx.accounts.base_account;
    base_account.total_gifs += 1;
    Ok(())
  }
}

// Attach certain variables to the StartStuffOff context.
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct AddGif<'info> {
    // the context can actually change total_gifs value on BaseAccounts.
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>
}

// Tell Solana what we want to store on this account.
#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
}
