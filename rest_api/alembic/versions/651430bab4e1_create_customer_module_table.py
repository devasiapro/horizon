"""create customer module table

Revision ID: 651430bab4e1
Revises: 2ebbb87a8436
Create Date: 2023-10-31 17:00:00.710771

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '651430bab4e1'
down_revision: Union[str, None] = '2ebbb87a8436'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'customer_module',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('merchant_english_name', sa.String(256), nullable=False),
        sa.Column('merchant_chinese_name', sa.String(256), nullable=True),
        sa.Column('wallet_type', sa.String(128), nullable=False),
        sa.Column('prefix', sa.String(128), nullable=True),
        sa.Column('business_contact', sa.String(128), nullable=True),
        sa.Column('billing_contact', sa.String(128), nullable=True), 
        sa.Column('technical_contact', sa.String(128), nullable=True), 
        sa.Column('customer_contact', sa.String(128), nullable=True), 
        sa.Column('maintainer_contact', sa.String(128), nullable=True), 
        sa.Column('company_contact', sa.String(128), nullable=True), 
        sa.Column('brand_name', sa.String(128), nullable=True), 
        sa.Column('staging_desktop_lobby_url', sa.String(128), nullable=True), 
        sa.Column('staging_mobile_lobby_url', sa.String(128), nullable=True), 
        sa.Column('staging_wallet_endpoint', sa.String(128), nullable=True), 
        sa.Column('staging_wallet_ip_port', sa.String(128), nullable=True), 
        sa.Column('staging_service_api_ip', sa.String(128), nullable=True), 
        sa.Column('production_desktop_lobby_url', sa.String(128), nullable=True), 
        sa.Column('production_mobile_lobby_url', sa.String(128), nullable=True), 
        sa.Column('production_wallet_endpoint', sa.String(128), nullable=True), 
        sa.Column('production_wallet_ip_port', sa.String(128), nullable=True), 
        sa.Column('production_service_api_ip', sa.String(128), nullable=True), 
        sa.Column('date_added', sa.DateTime(), nullable=False),
        sa.Column('instance', sa.String(128), nullable=True)
    )


def downgrade() -> None:
    op.drop_table('customer_module')
